import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsReducer";
import topSalesReducer from "./topSalesReducer";
import catalogReducer from "./catalogReducer";
import buyReducer from "./buyReducer";


const store = configureStore({
    reducer: {
        products: itemsReducer,
        topSales: topSalesReducer,
        catalog: catalogReducer,
        buy: buyReducer,
    }
});

export default store