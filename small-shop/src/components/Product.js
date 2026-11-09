import React from 'react';
import { useGlobalContext } from '../context';
import { Link } from "react-router-dom";


const Product = ({product}) => {
    const { addToCart, openModal, handleDetail } = useGlobalContext();
    const { id, title, img, price, inCart } = product;
    return (

        <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className='card'>
                <div
                    className="img-container p-3"
                    onClick={() => handleDetail(id)}
                >
                    <Link to="details">
                        <img src={img} alt="" className="card-img-top" />
                    </Link>
                    <button 
                        className="cart-btn"
                        disabled={inCart ? true : false}
                        onClick={() => {
                            addToCart(id);
                            openModal(id);
                        }}
                    >
                        {inCart ? (
                            <p className="text-capitalize mb-0" disabled>in cart</p>
                        ) : (
                            <i className="fas fa-cart-plus" />
                        )}
                    </button>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0">{title}</p>
                    <h5 className="text-blue font-italic mb-0">
                        <span className="mr-1">$</span>
                        {price}
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Product