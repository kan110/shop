import { useSelector, useDispatch } from "react-redux";
import { selectItemsByCategory, setSearch } from "../features/shop/shopSlice";

import ShopItem from "../components/ShopItem";
import FilterDrawer from "../components/FilterDrawer";

import {useTheme, useMediaQuery} from "@mui/material";
import { IconButton, Typography, Grid, CircularProgress, Box, Stack } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Shop () {
    const dispatch = useDispatch();

	const theme = useTheme();
    const isScreenMedium = useMediaQuery(theme.breakpoints.down('md'));

    const {
        searchCategory: category,
        searchTerm: search,
        isLoading
    } = useSelector((state) => state.shop);

    const shopItems = useSelector(selectItemsByCategory);

    let count = 0;

    const displayShopItems = [];
    shopItems.forEach(item => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
            ++count;
            displayShopItems.push(
                <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3} >
                    <ShopItem key={item.id} item={item}/>
                </Grid>
            );
        }
    });

    const clearSearch = () => {
        dispatch(setSearch(''));
    }

    if (isLoading) {
        return (
            <Stack
                sx={{padding: 1, justifyContent: 'center', alignItems:'center'}}
            >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '30vh'}}>
                    <CircularProgress/>
                </Box>
            </Stack>
        )
    }

    return (
		<Stack direction='row' sx={{justifyContent: 'center', flexGrow: 1, pt: 3}}>
            <Stack sx={{position: 'relative', justifyContent: 'center', width: [1, 1, .8], maxWidth: 1600, alignItems:'center'}}>
                <FilterDrawer isScreenMedium={isScreenMedium} />

                <Stack sx={{paddingLeft: 2, marginLeft: [0, 0, '250px'], flexGrow: 1, alignItems: 'center', alignSelf: 'stretch'}}>
                    <Stack sx={{px: 1, width: 1, alignItems: ['center', 'center', 'start']}}>
                        <Typography variant='h6'>{category === '' ? 'ALL PRODUCTS' : category.toUpperCase()}</Typography>
                        <Stack direction='row' alignItems='center' spacing={1} minHeight={40}>
                            {search && 
                                <>
                                    <Typography>{`Search results for "${search}"`}</Typography>
                                    <IconButton onClick={clearSearch} aria-label='clear search'>
                                        <HighlightOffIcon fontSize='small'/>
                                    </IconButton>
                                </>
                            }
                        </Stack>
                        <Typography gutterBottom>{count} {count === 1 ? 'item' : 'items'}</Typography>
                    </Stack>
                    
                    <Grid container
                        width={1}
                        sx={{justifyContent: ['center', 'center', 'left']}}
                    >
                        {displayShopItems}
                    </Grid>
                </Stack>
            </Stack>
		</Stack>
    )
}