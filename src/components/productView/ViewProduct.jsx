import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { doc, getDoc } from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {db} from '../../firebaseConfig'
import { AuthContext } from '../../context/AuthContext';
import './view.css'

const ViewProduct = () => {

    const {currentUser} = useContext(AuthContext);

    const {id} = useParams();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //get the data from firestore database collection "products"
    const geProductsFromFirestore = async() => {
        setLoading(true);
        const getProductData = await getDoc(doc(db, 'products', id));
        setProductData(getProductData.data());
        setLoading(false);
    };

    //create an array of all the stock values
    const stock = [];

    if (productData) {
        for (let i = 0; i < productData.stock; i++) {
            stock.push(i)
        }
    };

    //fetch data on page load
    useEffect(() => {
        geProductsFromFirestore();
    }, []);
    
  return (
    <div className="view-product">
        {loading ? 
         <div style={{ position: 'absolute', left: '50%', top: '50%'}}>
            <CircularProgress  />
        </div> 
        : 
        <>
        {productData && 
            <div className="product-view-details">
                <div className="product-back-button">
                    <NavLink className="nav-button" to="/">
                        <ArrowBackIcon />
                    </NavLink>
                </div>
                <div className="product-image">
                    <img src={productData.thumbnail} alt={productData.title}/>
                </div>
                <div className="product-details">
                    <div className="product-title">
                        <Typography variant="h4" sx={{color: '#ff5351'}}>{productData.title}</Typography>
                        <Typography variant="subtitle1" sx={{color: '#ff5351'}}>{productData.brand}</Typography>
                        <div className="product-price" sx={{margin: '20px auto'}}>
                            <Typography variant="h6" >
                                R {productData.price} ( -{productData.discountPercentage} %) 
                            </Typography>
                        </div>
                    </div>
                    <div className="product-desc">
                        <Typography variant="subtitle2" >
                            {productData.description}
                        </Typography>
                    </div>
                    <div>
                        <FormControl sx={{width: '200px'}} size="small">
                        <InputLabel id="demo-select-small">Quantity</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Quantity"
                            >
                                {stock.map((qty) => (
                                    <MenuItem value={qty}>{qty}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => alert('Added to cart')}>Add to cart</Button>
                        {currentUser?.uid === "hTCStf0SemgEXuO4mC2ts9SaYhq1" ? <Button variant="oultine" onClick={() => navigate(`/edit/${id}`)}>Edit</Button> : null}
                    </div>
                </div>
            </div>
        }
        </>    
    }
    </div>
  )
}

export default ViewProduct