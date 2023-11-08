import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

import { Routes, Route} from 'react-router-dom';

import { createTheme, ThemeProvider, CssBaseline, Stack} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getShopItems } from './features/shop/shopSlice';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: "Poppins"
  },
  palette: {
    primary: indigo
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    }
  }
});

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getShopItems());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Stack sx={{minHeight: '100vh'}}>
        <Navbar/>
        <Stack sx={{flexGrow: 1}}>
          <Routes> 
            <Route path="/" element={<Shop/>}/>
            <Route path="/:category" element={<Shop/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/item/:id" element={<Product/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Stack>
        <Footer/>
      </Stack>
      </ThemeProvider>
    </>
  );
}
