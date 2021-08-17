import React from "react";
import {formatCurrency} from "../services/util";
import {Link} from "react-router-dom";
import {addItem, changeItem} from "../store/actions/cartActions";
import {useDispatch, useSelector} from "react-redux";

const Product = (props) => {
    let items_ = useSelector((state) => state.cartReducer.items);
    const dispatch = useDispatch();

    // Function to add selected item in cart
    let addToCart = (product) => {
        const cartItems = items_.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item.id === product.id) { // Check if item is already added in the cart
                let count = item.count + 1; // Increase the quantity of item
                dispatch(changeItem({ ...product, count: count })); // Dispatch an action to update new quantity in cart
                alreadyInCart = true;
            }
        });
        if (alreadyInCart === false) dispatch(addItem({ ...product, count: 1 })); // Dispatch an action to add item to cart

    }
    return (
        <li className="bg-white border overflow-x-hidden rounded-xl hover:shadow-lg divide-y grid grid-rows-3">
            <figure className="p-10 row-span-2 flex items-center justify-center">
                <Link to={'product/' + props.product.id}>
                    <img src={props.product.img} alt={props.product.name} className="h-96"></img>
                </Link>
            </figure>
            <div className="grid grid-rows-2 p-10">
                <h3><Link to={'product/' + props.product.id} className="hover:text-pink-600">{props.product.name}</Link></h3>
                <p className="flex items-center justify-between">
                    <span className="text-4xl text-gray-600">{formatCurrency(props.product.price)}</span>
                    <button className="px-5 py-3 rounded-xl text-sm font-medium text-white bg-pink-600 hover:bg-pink-800 active:bg-grey-900 focus:outline-none border-4 border-white focus:border-purple-200 transition-all" onClick={() => addToCart(props.product)}>Add to Cart</button>
                </p>
            </div>
        </li>
    );
}

export default Product;