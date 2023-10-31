import {Link as RouterLink} from "react-router-dom"
import {Typography, Stack, Box, Link } from "@mui/material";

export default function ShopItem ({item}) {
    const ellipsisOverflowSx = {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    return (
        <Link 
            component={RouterLink}
            to={`/item/${item.id}`}
            sx={{textDecoration: 'none', color: 'common.black'}}
        >
            <Stack p={1} sx={{height: 1, alignItems: 'center'}}>
                <Box sx={{width: 1, maxWidth: '400px', height: 300, overflow: 'hidden', marginBottom: 1, backgroundColor: 'common.white'}}>
                    <Box
                        component='img'
                        src={item.image}
                        alt="product image"
                        sx={{
                            objectFit: 'contain',
                            width: 1,
                            height: 1,
                            padding: 2,
                            '&:hover': {
                                transform: 'scale(1.5)'
                            }
                        }}
                    />
                </Box>

                <Stack sx={{width: 1, maxWidth: '400px',justifyContent:'space-between', flexGrow: 1}} >
                    <Typography gutterBottom sx={ellipsisOverflowSx} >
                        {item.title}
                    </Typography>

                    <Typography sx={{fontWeight: 'bold'}}>
                        ${item.price.toFixed(2)}
                    </Typography>
                </Stack>
            </Stack>
        </Link>
    )
}