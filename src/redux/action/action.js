export function getListData() {
    return {
        type: "GET_LIST_DATA"
    }
}

export function addListData(data) {
    return {
        type: "ADD_LIST_DATA",
        payload: data
    }
}

export function deleteListData(updateListData) {
    return {
        type: "DELETE_LIST_DATA",
        payload: updateListData
    }
}

export function toggleRadio(index) {
    return {
        type: "TOGGLE_RADIO",
        payload: index
    }
}