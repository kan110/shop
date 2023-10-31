import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import CartItem from "./CartItem";

import { Drawer, Box, Stack, Typography, Divider, Button, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function CartDrawer ({isDrawerOpen, setIsDrawerOpen}) {
    const {cartItems, amount, cost} = useSelector((state) => state.cart);

    return (
        <Drawer
            anchor='right'
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            PaperProps={{
                sx: {maxWidth: 1, width: '400px'}
            }}
        >
            <Stack width={1} minHeight={1} >
                <Stack direction='row' sx={{height: 60, justifyContent: 'space-between', alignItems: 'center', px: 2, bgcolor: 'grey.300'}} >
                    <Typography variant='h6'>
                        <span style={{fontWeight: 'bold'}}>Cart</span>, {amount} {amount === 1 ? 'item' : 'items'}
                    </Typography>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <ClearIcon/>
                    </IconButton>
                </Stack>
                
                <Stack
                    divider={<Divider/>}
                    sx={{
                        px: 1,
                        flexGrow: 1,
                        overflowY: 'auto',
                    }}
                >
                    {cartItems.map(item => <CartItem key={item.id} {...item} />)}
                </Stack>

                <Stack height='150px' width={1} 
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        bgcolor: 'grey.400'
                }}>
                    <Stack width={1} direction='row' justifyContent='space-between' px={2} pt={1} sx={{bgcolor: 'grey.200'}}>
                        <Typography variant='subtitle1'>Subtotal</Typography>
                        <Typography variant='subtitle1'>${cost.toFixed(2)}</Typography>
                    </Stack>
                    

                    <Stack sx={{width: 1, pb: 1, bgcolor: 'grey.300', flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button 
                            component={RouterLink} 
                            to={'/cart'} 
                            variant='contained'
                            sx={{width: 1, maxWidth: '300px', height: '40px'}}
                        >Check Out</Button>
                        <Box>
                            <Typography>Free Shipping</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Drawer>
    )
}