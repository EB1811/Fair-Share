const initState = {
    temp: []
}

const distUserValuationsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'VAL_ACTION1':
            console.log("Success")
            return state;
        case 'VAL_ACTION2':
            console.log("Error ", action.err)
            return state
        default:
            return state;
    }
}

export default distUserValuationsReducer;