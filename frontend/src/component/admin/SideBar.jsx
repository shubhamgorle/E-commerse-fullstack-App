import React from 'react'
import "./SideBar.css"
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView"
import {TreeItem} from "@mui/x-tree-view/TreeItem"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { styled } from '@mui/material/styles';
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  '& .MuiTreeItem-content': {
    '&:hover': {
      backgroundColor: 'transparent', 
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
  }
}));

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to='/'>
        <img src={logo} alt="Ecommerce" id='sidebarLogo'/>
      </Link>

      <Link to='/admin/dashboard'>
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to=''>
        <SimpleTreeView
         slots={{
          expandIcon: ExpandMoreIcon,
          collapseIcon: ImportExportIcon,
        }}
        >
          <CustomTreeItem itemId='1' label="Products">
            <Link to='/admin/products'>
              <CustomTreeItem itemId='2' label="All"  />
            </Link>

            <Link to='/admin/product'>
              <CustomTreeItem itemId='3' label="Create" />
            </Link>
          </CustomTreeItem>
        </SimpleTreeView>
      </Link>

      <Link to='/admin/orders'>
            <p>
              <ListAltIcon/>
              Orders
            </p>
      </Link>
      <Link to='/admin/users'>
            <p>
              <PeopleIcon/>
              Users
            </p>
      </Link>
      <Link to='/admin/reviews'>
            <p>
              <RateReviewIcon/>
              Reviews
            </p>
      </Link>
    </div>
  )
}

export default SideBar
