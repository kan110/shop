import { changeQuantity, removeItem } from "../features/cart/cartSlice"
import { useDispatch } from "react-redux"

import { Link as RouterLink } from "react-router-dom";

import {Link, Box, Stack, Typography, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function CartItem ({id, title, price, image, quantity}) {
    const dispatch = useDispatch();

    return (
        <Box p={2} width={1} sx={{height: 200}}>
            <Stack direction='row' sx={{height: 1}}>
                <Link component={RouterLink} to={`/item/${id}`} 
                    sx={{height: 1, width: 0.25, maxWidth: '200px'}}
                >
                    <Box
                        component='img'
                        sx={{
                            objectFit: 'contain',
                            width: 1,
                            height: 1,
                        }}
                        src={image}
                    />
                </Link>

                <Box width={0.5} p={2}>
                    <Typography 
                        gutterBottom
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >{title}</Typography>
                    
                    <QuantityStepper id={id} quantity={quantity} />
                </Box>
                
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: 0.25
                }}>
                    <Typography align='right'>${(price * quantity).toFixed(2)}<br/>{quantity > 1 && `($${price.toFixed(2)} each)`}</Typography> 
                    <IconButton
                        aria-label='delete item'
                        onClick={() => {
                            dispatch(removeItem(id))
                        }}
                        sx={{'&:hover': {color: 'warning.main'}}}
                    >
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </Box>
            </Stack>
        </Box>
        
    )
}

function QuantityStepper ({id, quantity}) {
    const dispatch = useDispatch();

    return <Stack direction='row' alignItems='center'>
        <IconButton
            aria-label='decrease quantity'
            onClick={() => {
                if (quantity === 1) {
                    dispatch(removeItem(id))
                }
                else {
                    dispatch(changeQuantity({id, newQty: quantity - 1}));
                }
            }}
            sx={{'&:hover': {color: 'primary.main'}}}
        >
            <RemoveIcon fontSize='small'/>
        </IconButton>
        <Typography p={1}>{quantity}</Typography>
        <IconButton
            aria-label='increase quantity'
            onClick={() => {
                dispatch(changeQuantity({id, newQty: quantity + 1}));
            }}
            sx={{'&:hover': {color: 'primary.main'}}}
        >
            <AddIcon fontSize='small'/>
        </IconButton>
    </Stack>
}