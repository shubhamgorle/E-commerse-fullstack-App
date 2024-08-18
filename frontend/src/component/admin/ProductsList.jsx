import React,{Fragment, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import "./ProductsList.css"
import { getAdminProducts, clearErrors } from '../../actions/productaction';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Metadata from '../layout/Metadata';
import SideBar from './SideBar.jsx';
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
const ProductsList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, products} = useSelector((state)=>state.products)
  
  const columns = [
     {field:"id", headerName:"Product ID", minWidth:200, flex:0.5},
     {field:"name", headerName:"Name", minWidth:350, flex:1},
     {field:"stock", headerName:"Stock", minWidth:150, flex:0.3,type:"number"},
     {field:"price", headerName:"Price", minWidth:270, flex:0.5, type:"number"},
     {field:"actions", headerName:"Actions", minWidth:150, flex:0.3, type:"number", sortable:false, renderCell:(params)=>{
        return(
            <Fragment>
                <Link to={`/admin/product/${params.row.id}`}><EditIcon/></Link>
                <Button><DeleteIcon/></Button>
            </Fragment>
        )
     }},
     
  ]
  
  const rows = [];
  products &&
  products.forEach((item, index)=>{
     rows.push({
         id:item._id,
         stock : item.stock,
         price:item.price,
         name:item.name
     })
  })
  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
      dispatch(getAdminProducts())
  },[dispatch, error, alert])


    return (
     <Fragment>
        <Metadata title={`ALL PRODUCTS - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productsListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableRowSelectionOnClick
                className='productListTable'
                autoHeight
                />
            </div>
        </div>
     </Fragment>
  )
}

export default ProductsList
