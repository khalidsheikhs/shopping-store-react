import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"; // For using state and dispatching actions
import Product from "../components/Product";
import Cart from "../components/Cart";
import {setMeta} from "../services/util"; // For utility services
import Filter from "../components/Filter";
import {setAllProducts, setProducts} from "../store/actions/productActions"; // For using actions
import {fetchProducts} from "../services/apis"; // For fetching api data

const Products = () => {
    let products_ = useSelector((state) => state.productReducer.products); // Get all products from redux store
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch api data
        fetchProducts().then(res => {
            // Dispatch action to save data in redux store
            dispatch(setProducts(res.data));
            dispatch(setAllProducts(res.data));
        });
        // Utility method to set dynamic page title
        setMeta({
            title: 'Shopping Store',
            description: 'Shopping store application'
        });
    }, []);
    return (
        <div className="grid md:grid-cols-9 md:grid-flow-col gap-10">
            {/* Included cart component in the sidebar */}
            <Cart />

            <div className="md:col-span-7 px-10 md:pr-0">
                {/* Included filter component on the top of product listing */}
                <Filter />

                <div className="products mb-10">
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        { /* Check if products has data then show product card for each item */
                        products_.map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Products;