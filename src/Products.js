import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Cart from "./Cart";
import {fetchProducts } from "./app/features/productSlice";
import { addItem } from "./app/features/cartSlice";
import { useNavigate } from 'react-router-dom';


const ProductList = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);




    useEffect( () => {
        if(productStatus === 'idle') {
            dispatch(fetchProducts());

        }
    }, [dispatch, productStatus]);


    const addToCart = (product) => {
        dispatch(addItem(product));
    }

    const viewProductDetails = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <div>
            <Cart />
            <Divider />
            <h1>Products</h1>
            <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center">
                {
                    products.map(product =>
                        <Grid item key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={product.thumbnail}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
                                    <Button size="small" onClick={() => viewProductDetails(product.id)}>View Detail</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default ProductList;