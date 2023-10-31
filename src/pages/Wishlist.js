import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux"

import { Stack, Grid, Typography, Button, Link } from "@mui/material"
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import WishlistItem from "../components/WishlistItem";

export default function Wishlist () {
    const wishlistItems = useSelector((state) => state.wishlist.wishlist);
    
    const displayItems = wishlistItems.map((item) => {
        return (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <WishlistItem item={item} key={item.id} />
            </Grid>
        )
    })

    const contentEl = wishlistItems.length === 0 ? (
        <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center', 
                flexGrow: 1
            }}
        >
            <Typography variant='h6' align='center'>No saved items.</Typography>
            <Link component={RouterLink} to='/' sx={{textDecoration: 'none'}}>
                <Typography variant='h6' align='center'>Start shopping now!</Typography>
            </Link>
        </Stack>
    ) : (
        <Grid container sx={{justifyContent: 'start', maxHeight: '100%', width: [1, 1, .7], maxWidth: 1600}}>
            {displayItems}
        </Grid>
    );

    return (
        <> 
            <Stack sx={{bgcolor: 'grey.200', height: 70, justifyContent: 'center'}}>
                <Typography variant='h6' align='center'>SAVED ITEMS</Typography>
            </Stack>
            <Stack sx={{alignItems: 'center', flexGrow: 1}}>
                {contentEl}
            </Stack>
            <Stack sx={{mt: 2, alignItems: 'center', justifyContent: 'space-evenly', bgcolor: 'grey.200', height: 150, p: 2}}>
                <SyncOutlinedIcon/>
                <Typography variant='body2'>Sign in to sync your Saved Items.</Typography>
                <Button variant='outlined' sx={{cursor: 'not-allowed'}}>SIGN IN</Button>
            </Stack>
        </>
    )
}