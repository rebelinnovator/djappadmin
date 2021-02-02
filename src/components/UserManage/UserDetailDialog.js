import React, { useState, useEffect,useMemo } from "react";

import Button from '@material-ui/core/Button';
import {TextField , Select,MenuItem} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Role} from "../../helpers/role"

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),

      // width: '25ch',
    },
  },
}));

let roleSelectMenuItem = []
Object.entries(Role).forEach(([key,value])=>{
  roleSelectMenuItem.push(
    <MenuItem key={key} value={value}>{key}</MenuItem>
  )
})
const UserDetailDialog = ({open,setOpen,user,saveUser}) => {
      const [editUser,setEditUser] = useState(user)
      const classes = useStyles();
     useEffect(()=>{
       if(open)
        setEditUser(user)
     },[open])
     const handleChange = (e)=>{
          setEditUser({
          ...editUser,
          [e.target.name]:e.target.value
         
        })
     }
    return (
          <Dialog open={open} onClose={()=>{setOpen(false)}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit User({user.username})</DialogTitle>
            <DialogContent className={classes.root}>

              <TextField
                id="outlined-helperText"
                label="Name"
                name="name"
                variant="outlined"
                value={editUser.name}
                onChange={handleChange}
                fullWidth

              />

              <TextField
                id="outlined-helperText"
                label="UserName"
                name="username"
                variant="outlined"
                value={editUser.username}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="UserRole"
                name="userType"
                select
                value={editUser.userType}
                onChange={handleChange}
                variant='outlined'
                fullWidth

              >
                {roleSelectMenuItem}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{
                  saveUser(editUser) 
                  setOpen(false)
                }} color="primary">
                Save
              </Button>
              <Button onClick={()=>{setOpen(false)}} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
      
      );
}
export default UserDetailDialog