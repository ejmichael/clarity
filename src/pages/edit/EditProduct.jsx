import { Button, Typography } from '@mui/material';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {db} from '../../firebaseConfig'
import './edit.css'

const EditProduct = () => {

    const {id} = useParams();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState(productData);
    const navigate = useNavigate();

    const docRef = doc(db, 'products', id)

    //get the data from firestore database collection "products"
    const geProductsFromFirestore = async() => {
        setLoading(true);
        const getProductData = await getDoc(docRef)
        setProductData(getProductData.data())
        setLoading(false);
    };

    //fetch data on page load
    useEffect(() => {
        geProductsFromFirestore();
    }, []);

    //handle changes made to the product details
    const handleChange = (e) => {
        setUploadData({
            ...productData,
            [e.target.name]: e.target.value
        });
    };

    //update the product detaisl
    const updateProduct = async() => {
        try {
            await updateDoc(docRef, uploadData);
            navigate('/admin')
        } catch (error) {
            alert('Please enter data')
        }
    };

    //delete the product from the database
    const deleteProduct = async() => {
        await deleteDoc(docRef);
        navigate('/admin')
    };
    

  return (
    <div className="edit-product">
        {productData && <div className="productDetails">
        <div className="heading">
            <Typography variant="h3" color="red">Edit product:</Typography>
        </div>
            <div className="product-title">
                <input 
                    type="text" 
                    placeholder={productData.title}
                    onChange={(handleChange)}
                    name="title"
                />
            </div>
            <div className="edit-product-image">
                <img src={productData.thumbnail} alt={productData.title} />
            </div>
            <div className="product-desc">
            <textarea name="description" placeholder={productData.description} onChange={(handleChange)} type="text" />
            </div>
            <div className="product-metrics">
                <input name="price" type="number" onChange={(handleChange)} placeholder={productData.price}/>
                <input name="stock" type="number" onChange={(handleChange)} placeholder={productData.stock}/>
            </div>
            <div className='edit-buttons'>
                <Button onClick={updateProduct} variant="contained">Edit</Button>
                <Button onClick={deleteProduct} variant="outlined" color="error">Delete</Button>
            </div>
        </div>}
    </div>
  )
}

export default EditProduct