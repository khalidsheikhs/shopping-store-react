import React, {useState} from "react";
import {setProducts} from "../store/actions/productActions"; // For using actions
import {useDispatch, useSelector} from "react-redux"; // For using state and dispatching actions

const Filter = () => {
    const [sort, setSort] = useState('latest'); // Set sort option default value
    const [color, setColor] = useState('all'); // Set color option default value
    let products_ = useSelector((state) => state.productReducer.products); // Get all products from redux store
    let allProducts_ = useSelector((state) => state.productReducer.allProducts); // Get all initial sorted products from redux store
    const dispatch = useDispatch();

    // Function triggers when sort option change
    let sortProducts = (event) => {
        let products__ = event.target.products || products_;
        setSort(event.target.value); // Update sort state hook
        let sortedProducts = products__.slice().sort(
            (a, b) => (event.target.value === "lowest" ? ((parseFloat(a.price) > parseFloat(b.price)) ? 1 : -1) :
                event.target.value === "highest" ? ((parseFloat(a.price) < parseFloat(b.price)) ? 1 : -1) :
                    ((a.id < b.id) ? 1 : -1)));
        dispatch(setProducts(sortedProducts)); // Dispatch an action to update products by sorted option
    }

    // Function triggers when color option set
    let showProducts = (event) => {
        if (color !== event.target.value) {
            setColor(event.target.value); // Update color state hook
        } else return;

        let selectedProducts;
        if (event.target.value !== 'all') { // If a specific color is selected
            selectedProducts = allProducts_.filter((item) => event.target.value === item.colour.toLowerCase());
        } else selectedProducts = allProducts_;

        if (sort.length && sort !== 'latest') { // If sorted option previously changed
            let event = {
              target: {
                  value: sort,
                  products: selectedProducts
              }
            };
            sortProducts(event);
        } else dispatch(setProducts(selectedProducts)); // Dispatch an action to update products by selected color
    }
    return (
        <div className="flex justify-between py-3 border-b mb-10">
            <div>{products_.length} Items</div>
            <div className="flex justify-between w-1/2">
                <div>Show:
                    <label className="ml-2"><input type="radio" name="color" value="all" onChange={showProducts} checked={color === 'all'} /> All</label>
                    <label className="ml-2"><input type="radio" name="color" value="black" onChange={showProducts} checked={color === 'black'} /> Black</label>
                    <label className="ml-2"><input type="radio" name="color" value="stone" onChange={showProducts} checked={color === 'stone'} /> Stone</label>
                    <label className="ml-2"><input type="radio" name="color" value="red" onChange={showProducts} checked={color === 'red'} /> Red</label>
                </div>
                <div>Sort by: <select className="ml-2" onChange={sortProducts} defaultValue={sort}><option value="latest">Latest</option><option value="lowest">Lowest</option><option value="highest">Highest</option></select></div>
            </div>
        </div>
    );
}

export default Filter;