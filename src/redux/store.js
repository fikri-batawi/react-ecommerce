import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import productsReducer from './reducers/products'
import productsFilterReducer from './reducers/productsFilter'
import alertMessageReducer from './reducers/alertMessage'
import keywordReducer from './reducers/keyword'
import cartsReducer from './reducers/carts'

export default configureStore({
  reducer: {
    user : userReducer,
    products: productsReducer,
    productsFilter : productsFilterReducer,
    alertMessage : alertMessageReducer,
    keyword : keywordReducer,
    carts : cartsReducer,
  }
})