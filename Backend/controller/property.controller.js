const propertyModel = require('../model/property.model');
const userModel = require('../model/user.model');
const errorHandler = require('../utilities/errorHandler');



const getProperties = async (req, res, next) => {

    const user = req.user.id;

    try {
        
        const  property = await propertyModel.find({
            'createdBy.userId' : user
        });


        res.status(200).json({
            success: true,
            message: 'Properties have been fetched successfully',
            properties : property,
        });

    } catch (error) {
        next(error);
    }
};

const createProperty = async(req, res, next) => {

    const {
        propertyImg, propertyType, location, 
        price, description 
    } = req.body;

    const userId = req.user.id;

    try{

        let user = await userModel.findById({_id : userId});

        if(!user){
            return res.status(401).json({
                success : false,
                message : 'User not found',
            });
        }

        const createdBy = {
            userId : user._id,
            email : user.email,
        }

        let property = await propertyModel.find();

        property = new propertyModel({
            propertyType, propertyImg,
            location, price, description,
            createdBy : createdBy,
        });

        await property.save();

        res.status(200).json({
            success : true,
            message : "Property created successfully",
            property
        })

    }catch(err){
        next(err);  
    }
};


const updateProperty = async (req, res, next) => {

    const {
        propertyImg, propertyType, location,
        price, description, status } = req.body;
    
    const  id  = req.params.id;

    // console.log(id);

   try{
    const properties = await propertyModel.findByIdAndUpdate(
        id,
        {
            $set : {
                // propertyImg : propertyImg,
                propertyType : propertyType,
                location : location,
                price : price,
                status : status,
                description : description,
            }
        },
        { new : true },
    );

    // console.log(properties);


    res.status(200).json({
        success : true,
        message : "Property updated successfully",
        properties,
    });

   }catch(err){
    next(err);
   }
};



const searchProperty = async(req, res, next) => {

    const { location, minPrice, maxPrice, propertyType, status } = req.query;

    const query = {};

    if (location) {
        query.location = location;
      }
    
      if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        query.price = { $gte: minPrice };
      } else if (maxPrice) {
        query.price = { $lte: maxPrice };
      }

      if(status){
        query.status = status;
      }
    
      if (propertyType) {
        query.propertyType = propertyType;
      }

    try {
        const properties = await propertyModel.find(query);

        if(!properties){
            return res.status(400).json({
                success: false,
                message: 'property not found on this filter',
            })
        }

        res.status(200).json({
            success:true,
            message: "Property fetched successfully",
            properties,
        })
    } catch (error) {
        next(error);
    }
}



const deleteProperty = async( req, res, next) => {

    const id = req.params.id;

    try {

        await propertyModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Property has been deleted successfully',
        });

    }catch(err){
        next(err);
    }
} 


module.exports = {
    createProperty,
    getProperties,
    updateProperty,
    searchProperty,
    deleteProperty,
}