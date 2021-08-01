const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');

let RedisStore = require('connect-redis')(session);

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();
const MONGO_URL = `mongodb://${ MONGO_USER }:${ MONGO_PASSWORD }@${ MONGO_IP }:${ MONGO_PORT }/?authSource=admin`;

const connectionWithRetry = () => {
        mongoose.connect( MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log("Conectado exitosamente a DB"))
        .catch( ( error ) => {
            console.log(error);
            setTimeout( connectionWithRetry, 3000 );
        } )
}

connectionWithRetry();

const port = process.env.PORT || 3000;

app.enable("trust proxy");
app.use( cors() );

app.use( session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {                           // No son las configuraciones recomendadas, son solo para simplificar
        secure: false,          
        httpOnly: true,
        maxAge: 3000000                  // Milisegundos
    }
}) )

app.use( express.json() );


app.get("/api/v1/", (req, res) => {
    console.log("Yeah it ran");
    res.send("<h1> Probando automatización  </h1>");
})

app.use( "/api/v1/posts", postRouter );
app.use( '/api/v1/users', userRouter );

app.listen(port, () => console.log(`listening on port ${ port }`))
