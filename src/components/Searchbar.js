import { useDispatch } from "react-redux";
import { setSearch } from "../features/shop/shopSlice";

import { useNavigate } from "react-router-dom";

import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar ({setIsDrawerOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(document.getElementById('searchInput').value));
        document.getElementById('searchInput').value = '';
        navigate('/');
        setIsDrawerOpen(false);
    };

    return (
        <form action="" onSubmit={handleSearch}>
            <TextField 
                id='searchInput' 
                variant='outlined'
                placeholder='Search for products'
                size='small'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                sx={{
                    width:1,
                    borderRadius: 1
                }}
                ></TextField>
        </form>
    )
}