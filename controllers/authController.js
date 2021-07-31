const User = require("../models/userModel");
const bcrypt = require('bcryptjs');


const signUp = async( req, res ) => {
    
    const { username, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash( password,12 )

        const newUser = new User({ 
            username,
            password: hashPassword
         });

        await newUser.save();
        
        req.session.user = newUser;
         
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail'
        })
    }
}

const login = async( req, res ) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });

        if(!user){           
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }

        const isCorrect = await bcrypt.compare( password, user.password );

        if( isCorrect ){
            req.session.user = user;
            res.status(200).json({
                status: 'success'
            })
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'incorrect user or password'
            })
        }
        
    } catch (error) {
        console.log(error)
    }


}


module.exports = {
    signUp,
    login
}