import React, { useState, useEffect } from "react";

import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import PlayListService from "../services/playlist.service";

import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Typography,Button} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: '250px',
      margin:'5px'
    },
    media: {
      height: 250,
    },
  });
const PlayList = (props) =>{
    
    const [playList,setPlayList] = useState([])
    const classes = useStyles();

    useEffect(()=>{
        PlayListService.getAllPlayList().then(
            (response)=>{
                console.log(response.data)
                setPlayList(response.data)
            },
            (error)=>{

            }
        );
    },[])
    const gotoDetail = (id)=>{
        
        props.history.push(`/playlistDetail/${id}`);

        //return <Redirect to={`/playlistDetail/${id}`}/>;
    }
    return(
        <div className="container">
            <header className="jumbotron">
                <h3>PlayList</h3>
            </header>
            <div className="flex-wrap d-flex justify-content-center">
                    {playList.map((item,index)=>{
                        return(
                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.media}
                                    image={item.image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.description}
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                <Button size="medium" color="primary" variant="outlined" onClick={()=>gotoDetail(item.id)}>
                                    Edit
                                </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
            </div>
        </div>
    )
}
export default PlayList