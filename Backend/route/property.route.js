const express = require('express');
const { createProperty, getProperties, updateProperty, deleteProperty, searchProperty } = require('../controller/property.controller');
const propertyRoute = express.Router();
const  { verifyToken } = require('../utilities/verifyToken');


propertyRoute.post('/createProperty', verifyToken , createProperty);
propertyRoute.post('/updateProperty/:id', updateProperty);
propertyRoute.get('/getProperty', verifyToken,  getProperties);
propertyRoute.get('/getSearchProperty', searchProperty);
propertyRoute.delete('/deleteProperty/:id', deleteProperty);


module.exports = {
    propertyRoute
}