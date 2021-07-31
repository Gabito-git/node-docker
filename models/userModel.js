const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        required: [ true, 'User must have a username' ],
        unique: true
    },
    password:{
        type: String,
        required: [ true,  'User must have a password' ]
    }

})


module.exports = model( 'User', userSchema );