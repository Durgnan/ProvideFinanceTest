import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";


const Cart = ({ text='Browse the items in your cart and then click Checkout', mode='browse' }) => {
    const navigate = useNavigate();
    const products = useSelector((state) => state.cart.cart);

    const handleCheckout = () => {
        navigate('/checkout');
    }
    
    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>{text}</p>
            <List>
                {
                    products
                        .map(product =>
                            <ListItem>
                                <ListItemText primary={product.title} secondary={'Quantity: ' + product.quantity}/>
                            </ListItem>
                        )
                }
            </List>
            <div>Total Price: {products.reduce((n, {price}) => n + price, 0)}</div>
            {mode === 'browse' ? (
                <Button style={{marginBottom: 10}} onClick={handleCheckout} variant={'contained'}>Checkout</Button>
            ) : (
                <Button style={{marginBottom: 10}} href={'/checkout'} variant={'contained'}>Confirm Order</Button>
            )}
        </div>
    )
}

export default Cart;