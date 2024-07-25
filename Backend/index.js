require('dotenv').config();


const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const PORT = 8000;

const mongoose = require('mongoose');
const { authRoute } = require('./route/auth.route');
const { propertyRoute } = require('./route/property.route');



mongoose.connect(process.env.MONGO_DB).then(
    () => console.log("Database connection established successfully")).catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : ["http://localhost:3000"],
    // origin : [""],
    methods : ['GET', 'POST', "DELETE"],
    credentials : true
}));

app.get('/', (req, res) => {
    res.send({
        error : false,
        message : "Api is getting ready"
    })
});


app.use('/api/auth', authRoute);
app.use('/api/property', propertyRoute);

app.listen(PORT, () => console.log("Live on http://localhost:"+ PORT));