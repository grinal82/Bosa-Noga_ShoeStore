import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsReducer";
import topSalesReducer from "./topSalesReducer";
import catalogReducer from "./catalogReducer";


const store = configureStore({
    reducer: {
        products: itemsReducer,
        topSales: topSalesReducer,
        catalog: catalogReducer
    }
});

export default store