import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './app/features/cartSlice';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";


const Cart = ({ text='Browse the items in your cart and then click Checkout', mode='browse' }) => {
    const navigate = useNavigate();
    const products = useSelector((state) => state.cart.cart);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    let totalPrice = 0;
    let finalPrice = 0;

    const handleCheckout = () => {
        navigate('/checkout');
    }
    const handleConfirmOrder = () => {
        setModalOpen(true);
    }

    const handleDialogClose = () => {
        setModalOpen(false);
        // navigate('/');
        dispatch(clearCart());
    }

    products.forEach(element => {
        totalPrice += element.price * element.quantity;
        finalPrice += element.price * element.quantity * (1 - element.discountPercentage / 100);
    });

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
            <div>Total Price: {totalPrice.toFixed(2)}</div>
            <div>Final Price: {finalPrice.toFixed(2)}</div>
            {mode === 'browse' ? (
                <Button style={{marginBottom: 10}} onClick={handleCheckout} variant={'contained'}>Checkout</Button>
            ) : (
                <Button style={{marginBottom: 10}} onClick={handleConfirmOrder} variant={'contained'}>Confirm Order</Button>
            )}
            <Dialog 
                open={modalOpen}
                onClose={handleDialogClose}>
                    <DialogTitle>Order Confirmed</DialogTitle>
                    <DialogContent>
                        Your order has been confirmed. Thank you for shopping with us.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} autoFocus>
                            OK
                        </Button>    
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default Cart;