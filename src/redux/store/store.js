import { createStore, combineReducers } from 'redux'
import reducer from "../reducer/reducer";

export default function ConfigureStore(initialState = {}) {
    return createStore(
        reducer
    )
}