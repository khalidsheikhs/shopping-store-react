import React from "react";
import {formatCurrency} from "../services/util"; // For utility services
import {useDispatch, useSelector} from "react-redux"; // For using state and dispatching actions
import {changeItem, removeItem} from "../store/actions/cartActions"; // For using cart actions

const Cart = () => {
    let items_ = useSelector((state) => state.cartReducer.items); // Get all cart items from redux store
    const dispatch = useDispatch();

    // Function to remove selected item from cart
    let removeFromCart = (product) => {
        const cartItems = items_.slice();
        let stillInCart = true;
        cartItems.forEach((item) => {
            if (item.id === product.id && item.count > 0) { // Check if item is in cart
                let count = item.count - 1; // Decrease the quantity of item
                dispatch(changeItem({ ...product, count: count })); // Dispatch an action to update new quantity in cart
                stillInCart = false;
            }
        });
        if (stillInCart === true || product.count === 0) {  // Check if item quantity is 0 in cart
            const index = cartItems.indexOf(product);
            if (index > -1) dispatch(removeItem(product)); // Dispatch an action to remove item from cart
        }
    }

    // Function to get total amount to show in cart
    let getTotalAmount = () => {
        let amount = 0;
        if (items_.length) {
            items_.forEach((item) => {
                amount += item.count * item.price;
            });
        }
        return '$' + amount.toFixed(2).toLocaleString();
    }
    return (
        <div className="bg-white md:col-span-2 md:col-start-8 divide-y border-l">
            {items_.length === 0 ? (<div className="p-3">Cart is empty</div>) : (<div className="p-3">You have {items_.length} item(s) in cart</div>)}
            <div className="p-4 pb-0">
                { /* Check if cart has data then show item card for each item */
                items_.map(item => (
                    <div key={item.id} className="gap-3 grid grid-cols-3 mb-4">
                        <figure className="h-28"><img src={item.img} alt={item.name} className="h-full mx-auto"></img></figure>
                        <div className="text-sm col-span-2">
                            <div>{item.name}</div>
                            <div className="flex items-center justify-between">
                                <div>{item.count} X {formatCurrency(item.price)}</div>
                                <div>
                                    <button onClick={() => removeFromCart(item)} className="px-3 py-1 rounded-lg text-sm text-gray-800 bg-gray-300 focus:outline-none border-4 border-white focus:border-gray-200 transition-all">Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            { /* Check if cart has items then show the total amount and checkout button */
            items_.length !== 0 &&
                <div className="grid grid-cols-2 items-center gap-5 p-3">
                    <div className="text-gray-600 text-lg">Total: {getTotalAmount()}</div>
                    <div className="text-right">
                        <button className="px-5 py-3 rounded-xl text-sm font-medium text-white bg-pink-600 hover:bg-pink-800 active:bg-grey-900 focus:outline-none border-4 border-white focus:border-purple-200 transition-all">Proceed</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;