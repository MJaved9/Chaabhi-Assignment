import {combineReducers, legacy_createStore} from "redux"
import { AppReducer } from "./AppReducer/AppReducer"


const store=legacy_createStore(combineReducers({AppReducer}))

export {store}