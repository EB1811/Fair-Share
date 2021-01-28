const initState = {
    goodsArray: [],
    totalValue: 0,
};

const distGoodsInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_ROOMS":
            console.log("Success", action.type);

            // Create array of rooms based on how many goods there are.
            var tempRoomsArr = [];
            for (var i = 0; i < action.roomCount; i++) {
                var room = { Good: "Room " + (parseInt(i) + 1), Value: 0 };
                tempRoomsArr.push(room);
            }

            return {
                ...state,
                goodsArray: tempRoomsArr,
            };
        case "ADD_GOODS":
            console.log("Success", action.type);

            // Add good name to goods array by first turning it into a good object.
            var tempGoodsArr = state.goodsArray;
            var good = {
                Good: String(action.good.Good),
                Value: 0,
            };
            tempGoodsArr.push(good);

            var goodsTotalVal = 1000;
            if (action.good.goodValue) {
                goodsTotalVal = state.totalValue + action.good.goodValue;
            }

            return {
                ...state,
                totalValue: goodsTotalVal,
                goodsArray: tempGoodsArr,
            };
        case "UPDATE_TOTAL_VALUE":
            console.log("Success ", action.type);
            var newTotal = action.i;

            return {
                ...state,
                totalValue: newTotal,
            };
        case "UPDATE_VALUATIONS":
            console.log("Success", action.type);

            // Create array of objects based on how many goods there are.
            var tempUpdatedArr = action.updatedArr;

            return {
                ...state,
                goodsArray: tempUpdatedArr,
            };
        default:
            return state;
    }
};

export default distGoodsInfoReducer;
