import React, { useState, useEffect,useMemo } from "react";

//import UserService from "../services/user.service";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import UserManageService from "../../services/usermanage.service"

import UserDetailDialog from './UserDetailDialog'

const UserManage = (props) =>{
    const [userlists,setUserLists] = useState([]);
    const [pages,setPages] = useState(1);
    const [openDialog,setOpenDialog]=useState(false);
    const [selUser,setSelUser] = useState({})

    useEffect(()=>{
       getAllUser()
    },[])
    const getAllUser = ()=>{
        UserManageService.getAllUser().then(
            (response)=>{
                setUserLists(response.data.users)
            },
            (error)=>{

            }
        )
    }
    const selectUser = (info)=>{
        console.log(info)
        setSelUser(info)
        setOpenDialog(true);
    }
    const saveUserInfo = (user)=>{
        UserManageService.saveUserInfo(user).then(
            (response)=>{
                if(response.data.success == true){
                    getAllUser()
                }else
                {

                }
            },
            (error)=>{

            }
        )
    }
    return(
        <div className="container">
            <header className="jumbotron">
                <h3>UserManage</h3>
            </header>
            <div className="flex-wrap d-flex justify-content-center">
                 <ReactTable
                    data={userlists}
                    defaultPageSize={10}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick:()=>{selectUser(rowInfo.original)}
                        }
                    }}
                    columns={[
                        {
                            Header: '',
                            accessor: 'imageUrl', // String-based value accessors!
                            Cell:t=>{
                                return(
                                    <div>
                                        <img className="rt-rw-img" src={t.value}/>
                                    </div>
                                )
                            }
                        },
                        {
                            Header: 'Name',
                            accessor: 'name', // String-based value accessors!
                            Cell:t=>{
                                return(
                                    <div>{t.value}</div>
                                )
                            }
                        },
                        {
                            Header: 'UserName',
                            accessor: 'username', // String-based value accessors!
                            Cell:t=>{
                                return(
                                    <div>{t.value}</div>
                                )
                            }
                        },
                        {
                            Header: 'Email',
                            accessor: 'email', // String-based value accessors!
                            Cell:t=>{
                                return(
                                    <div>{t.value}</div>
                                )
                            }
                        },
                        {
                            Header: 'UserType',
                            accessor: 'userType', // String-based value accessors!
                            Cell:t=>{
                                return(
                                    <div>{t.value}</div>
                                )
                            }
                        },
                    ]}
                /> 
                <UserDetailDialog open={openDialog} setOpen={setOpenDialog} user={{...selUser}} saveUser={saveUserInfo}/>
            </div>
        </div>
    )
}
export default UserManage