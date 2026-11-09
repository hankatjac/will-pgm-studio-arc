import React from 'react';
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { useGlobalContext } from '../../context';
import EmptyCart from "./EmptyCart";

const Cart = () => {
    const { cart } = useGlobalContext();
    
    return (
        <section>
            {(cart.length > 0) ?
                (
                    <>
                        <Title name="your" title="cart" />
                        <CartColumns />
                        <CartList cart={cart} />
                        <CartTotals cart={cart} history={cart.history} />
                    </>
                ) :
                (
                    <EmptyCart />
                )
            }
        </section>
    )
}

export default Cart