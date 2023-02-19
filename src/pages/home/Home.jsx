import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import {db} from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';

import './home.css'

import { Typography, CircularProgress, Button } from '@mui/material';
import Product from '../../components/product/Product';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';


const Home = () => {


    const {currentUser} = useContext(AuthContext);

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);

    //get the data from firestore database collection "products"
    const getProductsFromFirestore = async() => {
        setLoading(true)
        const getProductData = await getDocs(collection(db,'products'))
        getProductData.forEach((data) =>{
          setProductData((d) =>[
            ...d,
            { 
              docID: data.id,
              id: data.data().id,
              title: data.data().title,
              brand: data.data().brand,
              price: data.data().price,
              stock: data.data().stock,
              description: data.data().description,
              category: data.data().category,
              rating: data.data().rating,
              discountPercentage: data.data().discountPercentage,
              thumbnail: data.data().thumbnail
            }
          ])
        })
        setLoading(false);
      }

    // const getProductData = async() => {
    //   setLoading(true);
    //   axios("https://dummyjson.com/products/?skip=5&limit=100").then((res) => {
    //     setProductData(res.data.products);
    //   }).then(() =>{
    //     setLoading(false);
    // })
    //   .catch((err) => {
    //     console.log(err)
    //   });
    // };
     console.log(productData);

    // const uploadProduct = async(eachProduct) =>{
    //   try {
    //     await addDoc(collection(db, 'products'), eachProduct).then(res => {
    //       console.log("Document added!", res)
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // for (let i = 0; i < productData.length; i++) {
    //   const eachProduct = productData[i];
    //   uploadProduct(eachProduct)
    // }

    const phoneProducts = productData.filter((product) => {
        return product['category'] === 'furniture';
    });

    const bestDeals = productData.filter((product) => {
        return product['discountPercentage']  > 17
    });

    console.log(productData)
  
    useEffect(() => {
      getProductsFromFirestore();
    }, [])


  return (
    <div className='home-page'>
        <Navbar productData={productData} />
        {loading ? 
                <div style={{ position: 'absolute', left: '50%', top: '50%'}}>
                    <CircularProgress  />
                </div>
            :
        <>
        <div className='best-rated scroll'>
        {currentUser?.uid === "hTCStf0SemgEXuO4mC2ts9SaYhq1" ? 
                <Link to="/admin" style={{textDecoration: 'none', width: '100%', textAlign: 'right'}}>
                    <Button sx={{maxWidth: '100px'}} variant='contained' color="error">Admin</Button>
                </Link>
                :
                null
        }
            <Typography variant='h5' sx={{marginLeft: '20px'}} >
                Best Rated Furniture
            </Typography>
            {phoneProducts && 
            <div className='product-list'>
                {phoneProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>}
        </div>

        <div className="scroll best-deals">
            <Typography variant='h5' sx={{marginLeft: '20px'}} >
                Biggest Savings
            </Typography>
            {bestDeals && 
            <div className='product-list'>
                {bestDeals.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>}
        </div>
        </>  }     
    </div>
  )
}

export default Home