import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, Chip, Rating, Stack, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from './app/features/productSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const options = {
    weekday: 'short', // "Sun"
    year: 'numeric',  // "2024"
    month: 'short',   // "Aug"
    day: '2-digit',   // "04"
    hour: '2-digit',  // "22"
    minute: '2-digit',// "06"
    hour12: true     // 24-hour format
};

const ProductDescription = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const productStatus = useSelector((state) => state.products.status);
    const product = products.filter(product => product.id === Number(id))[0];

    useEffect( () => {
        if(productStatus === 'idle') {
            dispatch(fetchProducts());

        }
    }, [dispatch, productStatus]);

    if (!product) {
        return <div>Loading...</div>;
    }
    else {

        const {title, description, category, price, discountPercentage, rating, stock, tags, sku, weight, dimensions, warrantyInformation, shippingInformation, availabilityStatus, reviews, returnPolicy, minimumOrderQuantity, meta, images, thumbnail} = product;
        let discountedPrice =  price - (price * discountPercentage / 100);
        discountedPrice = discountedPrice.toFixed(2);
        return (
            <div>
                <Card>
                    <CardMedia
                        component="img"
                        height={"300px"}
                        width={"300px"}
                        image={images[0]}
                        alt={title}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">{title}</Typography>
                        <br/>
                        <Typography variant="body2" color="text.secondary">{description}</Typography>
                        <br/>
                        <Typography variant="body2" color="text.secondary">Price: £{discountedPrice} {<span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{price}</span>} </Typography>
                        <Typography variant="body2" color="text.secondary">Discount: -{discountPercentage}%</Typography>
                        <br/>
                        <Typography variant="body2" color="text.secondary" className='dis-flex align-items-center'>
                                Rating: <Rating name="read-only" value={rating} readOnly />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Category: {category}</Typography>
                        <Typography variant="body2" color="text.secondary" className='dis-flex align-items-center'>
                            <p>Tags: &nbsp;  </p>
                            <Stack direction="row" spacing={1} >
                                {tags.map((tag) => {return(<Chip label={tag} color="success" variant="outlined" />)})}
                            </Stack>
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="text.secondary">SKU: {sku}</Typography>
                        <Typography variant="body2" color="text.secondary">Stock: {stock}</Typography>
                        <Typography variant="body2" color="text.secondary">Weight: {weight}</Typography>
                    </CardContent>
                </Card>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Warranty Information
                    </AccordionSummary>
                    <AccordionDetails>
                        {warrantyInformation}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Shipping Information
                    </AccordionSummary>
                    <AccordionDetails>
                        {shippingInformation}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Availability Status
                    </AccordionSummary>
                    <AccordionDetails>
                        {availabilityStatus}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Return Policy
                    </AccordionSummary>
                    <AccordionDetails>
                        {returnPolicy}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Minimum Order Quantity
                    </AccordionSummary>
                    <AccordionDetails>
                        {minimumOrderQuantity}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Dimensions (W x H x D)
                    </AccordionSummary>
                    <AccordionDetails>
                        {dimensions.width} x {dimensions.height} x {dimensions.depth}
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Reviews
                    </AccordionSummary>
                    <AccordionDetails>
                    {
                        reviews.map((review) => {
                            const { rating, comment, date, reviewerName, reviewerEmail } = review;
                            return(
                                <>
                                    <Card>
                                        <CardContent>
                                            <span className='dis-flex justify-space-between'>
                                                <Typography variant="body2" color="text.secondary">{reviewerName}</Typography>
                                                <Rating name="read-only" value={rating} readOnly />
                                            </span>
                                            <span className='dis-flex justify-space-between'>
                                                <Typography variant="body2" color="text.secondary">{reviewerEmail}</Typography>
                                                <Typography variant="body2" color="text.secondary">{new Date(date).toLocaleString('en-US', options).replace(',', '')}</Typography>
                                            </span>
                                            <br/>
                                            <Typography variant="body2" color="text.secondary">{comment}</Typography>
                                        </CardContent>
                                    </Card>
                                    <br/>
                                </>
                            )
                        })
                    }
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

}

export default ProductDescription;