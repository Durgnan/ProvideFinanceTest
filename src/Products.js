import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Cart from "./Cart";
import {fetchProducts } from "./app/features/productSlice";
import { addItem } from "./app/features/cartSlice";


const ProductList = () => { 
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);




    useEffect( () => {
        if(productStatus === 'idle') {
            dispatch(fetchProducts());

        }
    }, [dispatch, productStatus]);


    const addToCart = (product) => {
        const newProduct = { ...product, quantity: 1};
        console.log(product);
        dispatch(addItem(product));
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