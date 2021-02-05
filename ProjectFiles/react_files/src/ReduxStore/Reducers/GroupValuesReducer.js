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

            var tempUserArr = state.userArray;
            tempUserArr.push({
                //! userID,
                name: String(action.id),
                userGoodsArr: JSON.parse(JSON.stringify(action.goods)), // Deep clone goods array.
            });

            return {
                ...state,
                userArray: tempUserArr,
            };
        //* Connect to API and get allocations using userArray.
        case "GET_ALLOCATIONS":
            console.log("Success", action.type);

            //* API accepts JSON format with a matrix representing each user as a row, and each good as a column. Row, Column = user valuation.
            /*
            {
                "valueMatrix": 
                [ 
                    [500, 100, 700, 1], 
                    [1000, 200, 800, 5], 
                    [100, 500, 1000, 100]
                ]
            }
            */

            // First convert valuations in user array into a format compatible with API.
            //? Maybe send list of users and their valuations and let API convert to matrix (potentially simpler).
            const userCount = state.userArray.length;
            const goodsCount = state.userArray[0].userGoodsArr.length;
            var valueMatrix = Array.from(
                Array(userCount),
                () => new Array(goodsCount)
            );
            for (var i = 0; i < userCount; i++) {
                for (var j = 0; j < goodsCount; j++) {
                    valueMatrix[i][j] =
                        state.userArray[i].userGoodsArr[j].Value;
                }
            }

            // Connect to API.
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Origin: "http://localhost:3000",
                },
                body: JSON.stringify({
                    valueMatrix: valueMatrix,
                }),
            };
            fetch("https://localhost:5001/api/getAllocation", requestOptions)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => {
                    console.log(err);
                });

            return {
                ...state,
            };
        default:
            return state;
    }
};

export default GroupValuesReducer;
