import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductsFilter } from '../redux/reducers/productsFilter';
import { updateKeyword } from '../redux/reducers/keyword';

const Search = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.value);
    const keyword = useSelector(state => state.keyword.value);

    const searchHandler = (keyword) => {
        const filterProducts = [];
        products.forEach(data => {
            const isNameSearch = data.name.toLowerCase().search(keyword.toLowerCase());
            const isDescriptionSearch = data.description.toLowerCase().search(keyword.toLowerCase());
            if(isNameSearch !== -1 || isDescriptionSearch !== -1){
                filterProducts.push(data);
            }
        })
        dispatch(updateKeyword(keyword))
        dispatch(updateProductsFilter(filterProducts))
    }

    return <input type="text" className="form-control" value={keyword} onChange={(e) => searchHandler(e.target.value)} placeholder='Search' />
}

export default Search;