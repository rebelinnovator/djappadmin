import React, { useState, useEffect } from "react";

import PlayListService from "../services/playlist.service";
import axios from 'axios'; 

import {Chip,Button} from '@material-ui/core';
// import {DropzoneDialog} from 'material-ui-dropzone'
import API_Config from '../services/config'

const PlayListDetail =(props) =>{
    const [songList,setSongList] = useState([])
    const [showDropZone,setShowDropZone] = useState(false)

    useEffect(()=>{
        getSongList()
    },[])
    const getSongList = ()=>{
        let {id} = props.match.params    

        PlayListService.getPlayListDetail(id).then(
            (response)=>{
                setSongList(response.data.songResponse)
            }
        );
    }
    const handleSelectFile = e =>{
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append(
            "singleFile",
            file,
            file.name
        );
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params:{
                mode:'audio'
            }
        }
        axios.post(`${API_Config.API_URL}uploadfile`, formData,config)
        .then(res=>{
            let fileinfo = res.data.file
            let {id} = props.match.params    

            PlayListService.addSongToPlayList(id,fileinfo.filename,fileinfo.originalname).then(
                (response)=>{
                    if(response.data.result == true){
                        getSongList()
                    }
                }
            )
        })
    }
    const openAudio = (audio)=>{
        window.open(`${audio.path}`);

    }
    const deleteAudio = (audio)=>{
        
        let {id} = props.match.params    

        PlayListService.removeSongToPlayList(id,audio.id).then(
            (response)=>{
                if(response.data.result == true){
                    getSongList()
                }
            }
        )


    }
    return(
        <div className="container">
            <header className="jumbotron">
                <h3>PlayListDetail</h3>
            </header>
            <div className="d-flex justify-content-between">
                <div style={{width:'50%'}}>
                    <div className="m-4">

                        <h4>Selected</h4>
                    </div>
                    {songList.map((item,index)=>{
                        return(
                            <div className="m-4">
                            <Chip 
                                color="primary" 
                                clickable 
                                onClick={()=>openAudio(item)} 
                                variant="outlined" 
                                label={item.name}
                                deleteIcon={<div style={{color:'red'}}>X</div>}
                                onDelete={()=>deleteAudio(item)}
                            >
                                {item.name}
                            </Chip>
                            </div>
                        )
                    })}
                    <div className="Setting-Photo-Item-Detail">
                        <label htmlFor="avatar" style={{width:'75%',height:'45px'}}>
                            <input style={{display:'none'}} id="avatar" type='file' name='avatar' onChange={handleSelectFile} />
                            <Button color="primary" component="span" style={{color:'white',height:'100%'}} fullWidth variant='contained'>
                                Upload New
                            </Button>
                        </label>
                    </div>
                     {/* <DropzoneDialog
                        open={showDropZone}
                        onSave={uploadFile}
                        acceptedFiles={['.mp4' ]}
                        showPreviews={true}
                        maxFileSize={5000000}
                        onClose={()=>{setShowDropZone(false)}}
                    /> */}
                </div>
            </div>
            
        </div>
    )
}
export default PlayListDetail