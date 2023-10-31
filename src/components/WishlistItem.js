import ShopItem from "./ShopItem";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { removeWishlistItem } from "../features/wishlist/wishlistSlice";

import { Stack, Fab, Box, Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function WishlistItem ({item}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addToCart(item));
        dispatch(removeWishlistItem(item));
    }
    return (
        <>
            <Stack sx={{position: 'relative', height: 1, width: 1, justifyContent: 'space-between'}}>
                <Fab onClick={() => dispatch(removeWishlistItem(item))} size='small' sx={{position: 'absolute', right: 10, top: 10, boxShadow: 'none', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <DeleteOutlinedIcon/>
                </Fab>
                <Box>
                    <ShopItem item={item} />
                </Box>
                <Button variant='outlined' onClick={handleClick} sx={{m: 1}}>MOVE TO CART</Button>
            </Stack>
        </>
    )
}