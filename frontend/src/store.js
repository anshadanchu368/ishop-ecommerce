


import { configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/productSlice"





 const store = configureStore({
  reducer:{
      products: productReducer,
  },
  devTools: true,
});

export default store;