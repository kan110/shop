import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeWishlistItem } from "../features/wishlist/wishlistSlice";
import { addToRecent } from "../features/shop/shopSlice";

import RecentlyViewed from '../components/RecentlyViewed';
import CartDrawer from "../components/CartDrawer";
import NotFound from "./NotFound";

import {useTheme, useMediaQuery} from "@mui/material";
import { IconButton, Button, Typography, Grid, Box, Stack, Divider, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Product () {
    const dispatch = useDispatch();
    
    const {shopItems, recentlyViewed} = useSelector((state) => state.shop);
    const {wishlist} = useSelector((state) => state.wishlist);

    const {id} = useParams();
    const item = shopItems.find((item) => item.id === Number(id));

    useEffect(() => {
        if (item !== undefined) {
            dispatch(addToRecent(item));
        }
    }, [item, dispatch])


    const isInWishlist = wishlist.filter((item) => item.id === Number(id)).length > 0;
    
    const [isFavorite, setIsFavorite] = useState(isInWishlist);

    useEffect(() => {
        setIsFavorite(isInWishlist);
    }, [isInWishlist])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const theme = useTheme();
    const isScreenMedium = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event) => {
        dispatch(addToCart(item));
        const text = event.target.textContent;
        event.target.textContent = 'Added to Cart';
        event.target.disabled = true;
        setTimeout(() => {
            event.target.textContent = text;
            event.target.disabled = false;
        }, 1000);

        setIsDrawerOpen(true);
    }

    const handleChange = (event) => {
        if (isFavorite) {
            setIsFavorite(false);
            dispatch(removeWishlistItem(item));
        } else {
            setIsFavorite(true);
            dispatch(addToWishlist(item));
        }
    }

    const favoriteButton = isFavorite ? 
        (<IconButton onClick={handleChange} sx={{bgcolor: 'grey.200', marginLeft: 2}}>
            <FavoriteIcon/>
        </IconButton>)
        :
        (<IconButton onClick={handleChange} sx={{bgcolor: 'grey.200', marginLeft: 2}}>
            <FavoriteBorderIcon/>
        </IconButton>);


    if (item === undefined ) {
        return (
            <NotFound/>
        )
    }

    return (
        <>
            <Grid container margin='auto' spacing={0} sx={{maxWidth: 1000, width: [1, 0.8], justifyContent: 'center'}}>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 3}} xs={12} md={6}>
                    <Box
                        component="img"
                        src={item.image}
                        alt="product image"
                        sx={{
                            objectFit: 'contain',
                            width: 1,
                            maxWidth: 400,
                            height: 400,
                            padding: 2,
                            bgcolor: 'common.white',
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md={5} p={3}>
                    <Typography variant='h6' gutterBottom>{item.title}</Typography>
                    <Typography variant='subtitle' sx={{fontWeight: 'bold', display: 'inline-block', mb: 2}}>${item.price.toFixed(2)}</Typography>
                    <Typography variant='body2'>{item.description}</Typography>
                    <Stack direction='row' sx={{mb: 2, mt: 2}}>
                        <Button 
                            variant='contained'
                            onClick={handleClick}
                           sx={{flexGrow: 1}}
                        >Add to Cart</Button>

                        {favoriteButton}
                        {/* <Checkbox icon={<FavoriteBorderIcon/>} checkedIcon={<FavoriteIcon/>} checked={isFavorite} onChange={handleChange} sx={{bgcolor: 'grey.200', marginLeft: 2}}/> */}
                    </Stack>
                    
                    <Stack sx={{border: 1, borderColor: 'grey.300', p: 2, mb: 2}}>
                        <Stack direction='row' sx={{alignItems: 'center'}}>
                            <LocalShippingOutlinedIcon sx={{mr: 1}}/>
                            <Typography variant='body2'>Free Delivery</Typography>
                        </Stack>
                        <Stack direction='row' sx={{alignItems: 'center'}}>
                            <AssignmentReturnOutlinedIcon sx={{mr: 1}}/>
                            <Typography variant='body2'>Free Returns</Typography>
                        </Stack>
                    </Stack>

                    <AccordionInfo/>
                </Grid>
            </Grid>

            {!isScreenMedium && (recentlyViewed.length > 1) && <RecentlyViewed />}
            <CartDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
        </>
    )
}

function AccordionInfo () {
    return <>
        <Divider/>
        <Accordion sx={{boxShadow: 'none'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Care</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Clean according to instructions.</Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{boxShadow: 'none'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Shipping and Returns</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>This item is eligible for free shipping.</Typography>
            </AccordionDetails>
        </Accordion>
    </>
}