import React from 'react';
import ListProducts from './ListProducts';
import Search from '../../parts/Search';

const Products = ({products}) => {
    return(
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    <strong className="text-uppercase">PRODUCT LIMITED</strong>
                                </div>
                                <div className="col-4">
                                    <Search />
                                </div>
                            </div>
                            <hr />
                            <ListProducts products={products} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;