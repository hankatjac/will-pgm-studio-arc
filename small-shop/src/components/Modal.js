import React from 'react';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context';
import { Button } from 'react-bootstrap';

const Modal = () => {
    const { modalProduct, isModalOpen, closeModal } = useGlobalContext();
    const { img, title, price } = modalProduct;

    return (
        <div className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay' }`}>
            <div className='modal-container'>
                <div className="p-2 mx-auto text-center text-capitalize">
                    <h5>item added to cart</h5>
                    <img src={img} className="img-fluid" alt="" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price : ${price}</h5>
                    <Link to="/">
                        <Button
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link to="cart">
                        <Button
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Go To Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Modal