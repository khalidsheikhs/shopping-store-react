import React, {useEffect} from "react";
import {useParams} from "react-router-dom"; // For getting route params
import {useDispatch, useSelector} from "react-redux"; // For using state and dispatching actions
import {fetchProductById} from "../services/apis"; // For fetching api data
import Cart from "../components/Cart";
import {formatCurrency, setMeta} from "../services/util"; // For utility services
import {addItem, changeItem} from "../store/actions/cartActions"; // For using cart actions
import {selectedProduct} from "../store/actions/productActions"; // For using product actions

const ProductDetails = () => {
    const { productId } = useParams(); // Get route param productId
    let items_ = useSelector((state) => state.cartReducer.items); // Get all cart items from redux store
    let product_ = useSelector((state) => state.productReducer.product); // Get selected product from redux store
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch api data
        fetchProductById(productId).then(res => {
            // Utility method to set dynamic page title
            setMeta({
                title: 'Shopping Store - ' + res.data.name,
                description: res.data.name
            });
            dispatch(selectedProduct(res.data));
        });
    }, []);

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
        <div className="grid md:grid-cols-9 md:grid-flow-col gap-10">
            {/* Included cart component in the sidebar */}
            <Cart />

            <div className="md:col-span-7 px-10 md:pr-0">
                <div className="bg-white border grid grid-cols-3 my-10 overflow-x-hidden product">
                    <figure className="p-10 row-span-2 flex items-center justify-center">
                        <img src={product_.img} alt={product_.name} className="h-96"></img>
                    </figure>
                    <div className="col-span-2 p-10">
                        <h3 className="text-3xl mb-5">{product_.name}</h3>
                        <p className="mb-5">Color: {product_.colour}</p>
                        <p className="flex items-center justify-between">
                            <span className="text-4xl text-gray-600">Price: <span className="text-pink-600">{formatCurrency(product_.price)}</span></span>
                            <button className="px-5 py-3 rounded-xl text-sm font-medium text-white bg-pink-600 hover:bg-pink-800 active:bg-grey-900 focus:outline-none border-4 border-white focus:border-purple-200 transition-all" onClick={() => addToCart(product_)}>Add to Cart</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;