import CartItem from "../components/CartItem"

import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../features/cart/cartSlice";

import {Link as RouterLink} from "react-router-dom"

import { styled } from '@mui/material/styles';
import { Button, Typography, Grid, Stack, Divider, Box, Link } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    maxWidth: '100%', 
    width: '200px', 
    height: '40px', 
}));

export default function Cart () {
    const dispatch = useDispatch();
    const {cartItems, amount, cost} = useSelector((state) => state.cart);

    if (amount === 0) {
        return (
            <Stack sx={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}} >
                <Typography variant='h6' align='center'>Your bag is empty.</Typography>
                <Link component={RouterLink} to='/' sx={{textDecoration: 'none'}}>
                    <Typography variant='h6' align='center'>Start shopping now!</Typography>
                </Link>
            </Stack>
        )
    }
    return (
        <Box sx={{bgcolor: 'grey.200', p: 2, flexGrow: 1}}>
            <Grid container width={0.8} maxWidth={1200} margin='auto' spacing={2}>
                <Grid item xs={12} sm={7}>
                    <Stack sx={{height: 70, bgcolor: 'common.white', justifyContent: 'center', pl: 3, mb: 1}}>
                        <Typography variant='h6'>MY BAG</Typography>
                    </Stack>
                    <Stack divider={<Divider/>} sx={{bgcolor: 'common.white'}}>
                        {cartItems.map(item => <CartItem key={item.id} {...item}/>)}
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box p={2} sx={{bgcolor: 'common.white'}}>
                        <Typography variant='h6' textAlign='center' gutterBottom>TOTAL</Typography>

                        <Stack width={1} direction='row' justifyContent='space-between' px={2} pt={1}>
                            <Typography>Subtotal</Typography>
                            <Typography>${cost.toFixed(2)}</Typography>
                        </Stack>

                        <Typography px={2}>Free Shipping</Typography>
                        
                        <Divider sx={{margin: 1}}/>
                        <Stack width={1} py={1} sx={{alignItems: 'center', justifyContent: 'center'}}>
                            <StyledButton 
                                variant='contained'
                                sx={{cursor: 'not-allowed'}}
                            >Check Out</StyledButton>

                            <StyledButton sx={{}}
                                onClick={() => {dispatch(clearCart())}}
                            >Clear Cart</StyledButton>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}