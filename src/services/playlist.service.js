import axios from "axios";
import authHeader from "./auth-header";
import API_Config from './config'

const baseUrl = API_Config.API_URL + "admin/playlist/"
const getAllPlayList = () =>{
    return axios.get(baseUrl + "getAllPlayList");
}
const getAllSongs = () =>{
    return axios.get(baseUrl + "getAllSong");
}
const getPlayListDetail = (id) =>{
    return axios.get(baseUrl + "getSonginPlaylist",{
        params:{
            playlistID: id
        }
    });
}
const savePlayList = (id,songlist)=>{
    return axios.post(baseUrl + "savePlayList",{
        playlistID:id,
        songlist:songlist
    });
}
const addSongToPlayList = (id,filename,originname)=>{
    return axios.post(baseUrl + "addSongToPlayList",{
        playlistID:id,
        filename:filename,
        originname:originname
    });
}
const removeSongToPlayList = (id,songId)=>{
    return axios.post(baseUrl + "removeSongToPlayList",{
        playlistID:id,
        songId:songId
    });
}
export default {
    getAllPlayList,
    getAllSongs,
    getPlayListDetail,
    savePlayList,
    addSongToPlayList,
    removeSongToPlayList
}