import React from 'react'
import './product.css'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-details">
        <div className="product-info">
          <div className="product-title">
            <h4>{product.title.length > 15 ? `${product.title.substring(0,17)}...` : product.title}</h4>
          </div>
          <div className="product-brand">
            <small>by {product.brand}</small>
          </div>
          <div className="product-rating">
            <small>{product.rating} rating</small>
          </div>
        </div>
        <div className="product-price">
          <h5>R {product.price}</h5>
          <div>
          <small>was R { (product.price * (1 + (product.discountPercentage / 100))).toFixed(2) }</small>
          <small>{` (-${product.discountPercentage}%)` }</small>
          </div>
        </div>
      </div>
      <div className="product-buttons">
        <Link className='link' to={`/view/${product.docID}`}>
          <button>View Product</button>
        </Link>
      </div>
    </div>
  )
}

export default Product
