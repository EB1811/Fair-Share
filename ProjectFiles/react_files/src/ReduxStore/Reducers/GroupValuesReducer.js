const initState = {
    //* Array of users with their own goods and valuations array.
    // [{userEmail?, username, userGoodsArr}...]
    userArray: [],

    //* Array holding the allocations.
    //? Hold userId in 'user' key?
    // [{userEmail?, username, userGoodsArr}...]
    allocations: [],
};

const GroupValuesReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER":
            console.log("Success", action.type);

            const tempUserArr = [...state.userArray];
            tempUserArr.push({
                userEmail: action.email ? String(action.email) : null,
                username: String(action.username),
                userGoodsArr: JSON.parse(JSON.stringify(action.goods)), // Deep clone goods array.
            });

            return {
                ...state,
                userArray: tempUserArr,
            };
        case "ADD_INIT_USER":
            const tempInitUserArr = [...state.userArray];
            if (tempInitUserArr.length < 1) {
                console.log("Success", action.type);
                tempInitUserArr.push({
                    userEmail: String(action.email),
                    username: String(action.username),
                    userGoodsArr: JSON.parse(JSON.stringify(action.goods)), // Deep clone goods array.
                });
            }

            return {
                ...state,
                userArray: tempInitUserArr,
            };
        case "DELETE_USER":
            console.log("Success", action.type);

            const newUserArr = [...state.userArray].filter((user) => {
                if (user.userEmail) {
                    return user.userEmail !== action.userEmail;
                } else {
                    return user.username !== action.username;
                }
            });

            return {
                ...state,
                userArray: newUserArr,
            };
        case "SET_ALLOCATIONS":
            console.log("Success", action.type);

            const newAllocationsArr = [...action.allocationArr];

            return {
                ...state,
                allocations: newAllocationsArr,
            };
        default:
            return state;
    }
};

export default GroupValuesReducer;
