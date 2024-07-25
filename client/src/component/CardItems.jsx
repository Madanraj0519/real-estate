import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import toast from 'react-hot-toast';
import axiosInstance from '../constant/Backend/axiosInstance';
import { Link } from 'react-router-dom';

const CardItems = ({item, setShowUpdate, setDefaultValue, isDelete ,setIsDelete}) => {


  const handleUpdate = () => {
    setDefaultValue(item);
    setShowUpdate(true);
  };


  const handleDelete = async(id) => {

    try {
        const res = await axiosInstance.delete(`/api/property/deleteProperty/${id}`);

        if(res.data.success !== true) {
            toast.error(res.message);
        };

        toast.success(res.data.message);
        setShowUpdate(false);
        setIsDelete(!isDelete)
    } catch (error) {
        toast.error(error.message);
    }
};

  return (
    <>
     <Card sx={{ maxWidth: 300 } } key={item._id}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://c4.wallpaperflare.com/wallpaper/624/97/286/cityscape-burj-khalifa-dubai-city-sunrise-mist-skyscraper-building-long-exposure-tower-clouds-sky-wallpaper-preview.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {item.propertyType}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           {item.location}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           {item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status : {item.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className='flex justify-between items-center'>
         <Button size="small" color="primary" onClick={handleUpdate}>
           Update
         </Button>
         <Button size="small" color="primary" className='text-red-500' onClick={() => handleDelete(item._id)}>
           Delete
         </Button>
      </CardActions>
    </Card>
    </>
  )
}

export default CardItems