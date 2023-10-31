import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../features/shop/shopSlice";

import logo from "../images/logo.svg"
import Searchbar from "./Searchbar";

import {Link as RouterLink, useNavigate} from "react-router-dom"

import {useTheme, useMediaQuery} from "@mui/material";
import {styled} from '@mui/material/styles';
import { AppBar, Toolbar, Stack, Box, Button, IconButton, Badge, Link, Drawer, Divider, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';

const CategoryButton = styled(Button)(({ theme }) => ({
    color: 'black',
    textTransform: 'uppercase',
    '&:hover': {
        color: theme.palette.primary.main,
        background: 'transparent'
    }
}));

const NavbarIconButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        background: 'transparent'
    }
}));

export default function Navbar () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {amount} = useSelector((state) => state.cart);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCategoryClick = (event) => {
        dispatch(setCategory(event.target.id));
        navigate('/');
    }

    const categories = ["men's clothing", "women's clothing", "electronics", "jewelery"];
    let categoryButtons = categories.map((category) => 
        <CategoryButton 
            disableRipple
            key={category} 
            id={category} 
            onClick={handleCategoryClick}
        >
            {category === 'jewelery' ? 'jewelry' : category}
        </CategoryButton>
    );

    return (
        <>
            <AppBar position='static' sx={{boxShadow: 'none', backgroundColor: 'transparent'}}>
                <Toolbar>
                    {isScreenSmall && <MobileMenu/>}
                    <Link component={RouterLink} to="/" sx={{textDecoration: 'none', color: 'common.black', marginLeft: 1}}>
                        <Box
                        component='img'
                        src={logo}
                        alt="eshop logo"
                        sx={{
                            objectFit: 'contain',
                            width: 100,
                            height: 1,
                        }}
                    />
                    </Link>
                    <Box sx={{ flexGrow: 0.5 }} />

                    {!isScreenSmall &&
                        <Box sx={{ 
                            flexGrow: 1,
                            maxWidth: 700
                        }}>
                            <Searchbar setIsDrawerOpen={setIsDrawerOpen} />
                        </Box>
                    }

                    <Box sx={{ flexGrow: 1 }} />

                    {isScreenSmall && <MobileSearch isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />}
                    <NavbarIconButton sx={{cursor: 'not-allowed'}}>
                            <PersonOutlineOutlinedIcon/>
                    </NavbarIconButton>
                    <NavbarIconButton component={RouterLink} to="/wishlist">
                            <FavoriteBorderOutlinedIcon/>
                    </NavbarIconButton>
                    <Badge badgeContent={amount} color='primary'
                    overlap='circular'
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                    >
                        <NavbarIconButton component={RouterLink} to="/cart">
                            <ShoppingBagOutlinedIcon/>
                        </NavbarIconButton>
                    </Badge>
                </Toolbar>

                <Divider/>
                {!isScreenSmall &&
                    <Toolbar>
                        <Stack width={1} direction='row' spacing={5} sx={{justifyContent: 'center'}}>
                            <CategoryButton id="" onClick={handleCategoryClick} key="all">ALL</CategoryButton>
                            {categoryButtons}
                        </Stack>
                    </Toolbar>
                }
            </AppBar>
        </>
    )
}

function MobileMenu () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleCategoryClick = (event) => {
        handleMenuClose();
        dispatch(setCategory(event.target.id));
        navigate('/');
    }

    const categories = ["men's clothing", "women's clothing", "electronics", "jewelery"];
    let menuItems = categories.map((category) => 
        <MenuItem
            key={category}
            id={category}
            onClick={handleCategoryClick}
            sx={{
                textTransform: 'uppercase'
            }}
        >
            {category === 'jewelery' ? 'jewelry' : category}
        </MenuItem>
    );

    return (
        <>
            <IconButton
                id='categories-button'
                onClick={handleMenuClick}
                aria-controls={openMenu ? 'categories-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openMenu ? 'true' : undefined}
            >
                <MenuIcon/>
            </IconButton>

            <Menu 
                id="categories-menu" 
                anchorEl={anchorEl} 
                open={openMenu}
                MenuListProps={{
                    'area-labelledby': 'categories-button'
                }}
                onClose={handleMenuClose}
            >
                <MenuItem id='' onClick={handleCategoryClick}>ALL</MenuItem>
                {menuItems}
            </Menu>
        </>
    )
}

function MobileSearch ({isDrawerOpen, setIsDrawerOpen}) {
    return (
        <>
            <IconButton
                aria-label='search'
                onClick={() => setIsDrawerOpen(true)}
            >
                <SearchIcon/>
            </IconButton>

            <Drawer 
                anchor='top'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box p={2}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton
                            aria-label='close search'
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            <ClearIcon/>
                        </IconButton>
                    </Box>
                    <Searchbar setIsDrawerOpen={setIsDrawerOpen}/>
                </Box>
            </Drawer>
        </>
    )
}

