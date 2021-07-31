module.exports = {
    MONGO_IP: process.env.MONGO_IP || 'mongo',              // Se usa la variable por si en un futuro se require una DB Mongo que no esté en un contenedor
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || 'redis',             // Se usa la variable por si en un futuro se require una DB Redis que no esté en un contenedor
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET 
}