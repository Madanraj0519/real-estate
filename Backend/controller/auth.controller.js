const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const errorHandler = require('../utilities/errorHandler');
const userModel = require('../model/user.model');


const createToken = (id) => {
    const jwtSecretKey = process.env.JWT_SECRET_TOKEN;

    return jwt.sign({id}, jwtSecretKey, { expiresIn : "36000m"});
}

const registerUser = async(req, res, next) => {

    const { userName, email, password, phoneNumber } = req.body;

    try {

        let user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({
                success : false,
                message : `User with this ${email} already registered`
            })
        }


        const hashedPassword = bcrypt.hashSync(password);

        user = await userModel({
            userName,
            email,
            password : hashedPassword,
            phoneNumber
        });

        await user.save();

        const accessToken = createToken(user._id);

        return res.status(200).json({
            success : true,
            message : "User registered successfully",
            user,
            accessToken,
        })
        
    } catch (error) {
        next(error);
    }
};



const loginUser = async(req, res, next) => {

    const { email, password } = req.body;

    try {
        const validUser = await userModel.findOne({email});

        if(!validUser){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        };

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if(!validPassword){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials",
            })
        };

        const { password : hashedPassword, ...user} = validUser._doc;

        const accessToken = createToken(user._id);

        res.status(200).json({
            success : true,
            message : `Welcome, ${user.userName}`,
            user,
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    registerUser,
    loginUser,
}