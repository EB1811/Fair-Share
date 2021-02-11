const initState = {
    //* Array of users with their own goods and valuations array.
    // [{name, userGoodsArr}...]
    userArray: [],

    //* Array holding the allocations.
    //? Hold userId in 'user' key?
    // [{user, goods}...]
    allocations: [],
};

const GroupValuesReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER":
            console.log("Success", action.type);

            const tempUserArr = [...state.userArray];
            tempUserArr.push({
                userEmail: String(action.email),
                username: String(action.username),
                userGoodsArr: JSON.parse(JSON.stringify(action.goods)), // Deep clone goods array.
            });

            return {
                ...state,
                userArray: tempUserArr,
            };
        //* Connect to API and get allocations using userArray.
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
