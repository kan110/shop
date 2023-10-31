import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { clearRecent } from "../features/shop/shopSlice";

import { Button, Typography, Box, Stack, Divider, IconButton, Link} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function RecentlyViewed () {
    const dispatch = useDispatch()
    const recentItems = useSelector((state) => state.shop.recentlyViewed);
    const [page, setPage] = useState(1);

    const {id} = useParams();
    const thumbnails = recentItems.filter((item) => item.id !== Number(id)).map((item) => {
        return (
            <Link key={item.id} component={RouterLink} to={`/item/${item.id}`} >
                <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                        objectFit: 'contain',
                        width: 200,
                        height: 200,
                        padding: 2,
                    }}
                />
            </Link>
        )
    })

    const leftArrow = (page === 1) ? <IconButton disabled><ArrowBackIosNewOutlinedIcon/></IconButton> : 
    (<IconButton
        aria-label='view previous recent items'
        onClick={() => {
            setPage(prev => prev - 1);
        }}
    >
        <ArrowBackIosNewOutlinedIcon/>
    </IconButton>);

    const rightArrow = (page === Math.ceil(thumbnails.length / 3)) ? <IconButton disabled><ArrowForwardIosOutlinedIcon/></IconButton> :
    (<IconButton
            aria-label='view more recent items'
            onClick={() => {
                setPage(prev => prev + 1);
            }}
        >
            <ArrowForwardIosOutlinedIcon/>
    </IconButton>);


    return (<>
        <Divider/>
        <Stack sx={{alignItems: 'center'}}>
            <Box p={2} width={1} sx={{maxWidth: 1000}}> 
                <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h6'>RECENTLY VIEWED</Typography>
                    <Button variant='outlined' onClick={() => dispatch(clearRecent())}>CLEAR ALL</Button>
                </Stack>

                <Stack direction='row' sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {leftArrow}

                    <Stack direction='row' divider={<Divider orientation='vertical' flexItem/>} spacing={1}
                        sx={{width: 800, maxWidth: 1, justifyContent: 'center', alignItems: 'center', overflowX: 'auto', height: 250}}
                    >
                        {thumbnails.slice(page * 3 - 3, page * 3)}
                    </Stack>
                    
                    {rightArrow}
                </Stack>
            </Box>
        </Stack>
    </>)
}