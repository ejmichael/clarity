import React, { useContext, useState } from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'

const Navbar = ({productData}) => {

    const {currentUser} = useContext(AuthContext);

    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();


    //log the user out
    const logout = () => {
        signOut(auth);
        navigate('/login')
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const search = productData.filter((product) => {
        if (searchInput.length > 0) {    
            return product['title'].toLowerCase().includes(searchInput);
        }  
    });

  return (
    <div className="navbar">
        <div className="navbar-logo">
            <h2>Clarity Commerce</h2>
        </div>
        <div className="navbar-search">
            <TextField 
                id="outlined" 
                label="Search products" 
                type="search"
                onChange={handleChange}
                value={searchInput}
                size="small"
                color="error"
                sx={{maxWidth: '80%', margin: 'auto',}}
            />
            <div className='search-results'>
                {search.length > 0 ?
                <List 
                    sx={{
                        position: 'absolute',
                        overflow: 'auto',
                        maxHeight: 300,
                        bgcolor: 'background.paper',
                        width: '100%',
                        
                    }}
                >
                    {search.map((product) => (
                      <ListItem component="nav" >
                        <Link className='link' to={`/view/${product.docID}`} style={{width: '100%'}}>
                            <ListItemButton alignItems="flex-start" fullWidth >
                                <ListItemAvatar>
                                    <Avatar alt={product.image} src={product.thumbnail} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={product.title}
                                    secondary={product.category}
                                />
                            </ListItemButton>
                        </Link>
                      </ListItem>
                      ))} 
                  </List>
                : null}
            </div>
        </div>
       {currentUser ? <div className="navbar-cart">
             <Typography sx={{margin: 'auto 10px'}}>
                Hello, {currentUser.displayName}
            </Typography>
            
            <LogoutIcon onClick={logout} /> 
        </div> : 
        <Link to="/login" style={{textDecoration: 'none'}}>
            <Button variant='contained' color="error">Sign in</Button>
        </Link>}
    </div>
  )
}

export default Navbar