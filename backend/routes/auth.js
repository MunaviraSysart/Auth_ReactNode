const express = require('express');
const User = require('../models/User');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post('/signup', async (req, res) =>{
    const newUser = new User({
        email: req.body.email,
        mobile: req.body.mobile,
        //password changed to hash
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//login
router.post('/signin', async (req, res) =>{
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(401).json({error: 'User Not Found !! Please Register'})

         //decrypt the hashedpassword
         const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY);
         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
 
         if(originalPassword !== req.body.password) return res.status(401).json({error: 'Password did not match !!!'})
         //jwt token
         const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
         return res.status(200).json({accessToken: token, email: user.email})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;