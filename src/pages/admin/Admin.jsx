import React, {useState, useEffect} from 'react'
import './admin.css';

import {db} from '../../firebaseConfig'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

//table component
import ProductTable from '../../components/productTable/ProductTable'
import Navbar from '../../components/navbar/Navbar';


const Admin = () => {

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
          }
        ])
      })
      setLoading(false);
    }


  console.log(productData)

  useEffect(() => {
    getProductsFromFirestore();
  }, [])

  return (
    <div>
      <Navbar productData={productData} />
      {loading ? 
                <div style={{ position: 'absolute', left: '50%', top: '50%'}}>
                    <CircularProgress  />
                </div>
            :
      <>
      <div>
        <div>
          <h2>Products</h2>
        </div>
        <Box sx={{ height: 600, margin: '20px' }}>
          { productData && <ProductTable productData={productData} />}
        </Box>
      </div>
      </>}
    </div>
  )
}

export default Admin