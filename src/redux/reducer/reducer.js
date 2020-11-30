import { act } from "react-dom/test-utils"

const INITAL_STATE = {

    active: false,
    completed: false,
    all: '',
    listData: []
}

const reducer = (state = INITAL_STATE, action) => {
    console.log("action", action)
    switch (action.type) {
        case "GET_LIST_DATA":
            return {
                ...state
            }
        case "ADD_LIST_DATA": {
            return {
                ...state,
                listData: [...state.listData, action.payload]
            }
        }

        case "DELETE_LIST_DATA": {
            return {
                ...state,
                listData: [...action.payload]
            }
        }

        case "TOGGLE_RADIO": {
            let _listData = [...state.listData]
            _listData[action.payload].type = _listData[action.payload].type === "active" ? "completed" : "active";
            return {
                ...state,
                listData: _listData
            }
        }
        default:
            return state
    }
}

export default reducer;