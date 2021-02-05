const initState = {
    // Array of users with their own goods and valuations array.
    userArray: [],
};

const distGroupInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER":
            console.log("Success", action.type);

            var tempArr = state.userArray;
            tempArr.push({
                name: String(action.id),
                goodsArr: action.goods,
            });

            return {
                ...state,
                userArray: tempArr,
            };
        default:
            return state;
    }
};

export default distGroupInfoReducer;
