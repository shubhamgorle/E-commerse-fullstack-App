import React, {Fragment, useEffect, useRef} from 'react';
import CheckoutStep from './CheckoutStep';
import {useSelector, useDispatch} from "react-redux";
import Metadata from '../layout/Metadata';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import axios from 'axios';
import "./Payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"


const Payment = () => {

    const submitHandler = () =>{

    }

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const payBtn = useRef(null)
  return (
   <Fragment>
    <Metadata title = "Payment"/>
    <CheckoutStep activeStep={2}/>
    <div className="paymentContainer">
        <form action="" className="paymentForm"
        onSubmit={(e)=>submitHandler(e)}
        >
         <Typography>Card Info</Typography>
         <div>
            <CreditCardIcon/>
            <CardNumberElement className='paymentInput'/>
         </div>
         <div>
            <EventIcon/>
            <CardExpiryElement className='paymentInput'/>
         </div>
         <div>
            <VpnKeyIcon/>
            <CardCvcElement className='paymentInput'/>
         </div>
           <input type="submit" 
           value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
           ref={payBtn}
           className='paymentFormBtn'
           />
        </form>
    </div>
   </Fragment>
  )
}

export default Payment
