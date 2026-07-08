
import {configureStore} from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from "./Slice";


 const Store = configureStore({
    reducer : {
      user : userReducer
    }
 })

 export default Store