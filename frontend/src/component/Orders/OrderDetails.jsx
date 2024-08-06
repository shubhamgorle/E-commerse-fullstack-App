import React, { Fragment, useEffect } from 'react';
import "./OrderDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import Metadata from '../layout/Metadata';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
console.log(id)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getOrderDetails(id))
    }, [dispatch, alert, error, id])

    return (
        <Fragment>
          {
            loading ? <Loader/> : <Fragment> 
                <Metadata title="Order Details"/>
                
            </Fragment>
          }
        </Fragment>
    )
}

export default OrderDetails
