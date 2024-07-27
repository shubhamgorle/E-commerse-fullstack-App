import React, { Fragment, useState } from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userActions';
const UserOption = ({user}) => {
    const[open , setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()
    const options = [
        {icon:<ListAltIcon/>, name:"Orders", func : orders},
        {icon:<PersonIcon/>, name:"Profile", func : account},
        {icon:<ExitToAppIcon/>, name:"Logout", func : logoutUser}
    ];

    if(user.role === 'admin'){
        options.unshift({icon:<DashboardIcon/>, name:"Dashboard", func : dashboard})
    }

     function dashboard(){
         navigate("/dashboard")
     }
     function orders(){
        navigate("/orders")
     }
     function account(){
        navigate("/account")
     }
     function logoutUser(){
        dispatch(logout());
        alert.success("Logout SuccessFully")
     }

  return <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
      className='speedDial'
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      style={{zIndex:"11"}}
      direction='down'
      open={open}
      icon={<img 
        className='speedDialIcon'
        src={user.avatar.url ? user.avatar.url : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
        alt='profile'
      />
    }
    > 
    {
        options.map((item, idx)=>(
            <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={idx}/>
        ))
    }

</SpeedDial>
</Fragment>
}

export default UserOption
