const initState = {
    userArray: []
}

const distGroupInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            console.log("Success", action.id);

            var tempArr = state.userArray;
            tempArr.push(String(action.id));

            return {
                ...state,
                userArray: tempArr
            };
        default:
            return state;
    }
}

export default distGroupInfoReducer;