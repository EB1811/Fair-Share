const initState = {
    goodsArray: [],
    totalValue: 0,
    moneyAmount: 0,
    goodType: "",
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
            var r = "Rent";

            return {
                ...state,
                goodsArray: tempRoomsArr,
                goodType: r,
            };
        case "ADD_GOODS":
            console.log("Success", action.type);

            // Add good name to goods array by first turning it into a good object.
            var tempGoodsArr = [...state.goodsArray];
            /*
            var good = {
                Good: String(action.good.Good),
                estValue: action.good.Value,
                Value: 0,
            };*/
            tempGoodsArr.push(action.good);

            var goodsTotalVal;
            if (tempGoodsArr.some((good) => good.estValue > 0)) {
                goodsTotalVal = tempGoodsArr.reduce(
                    (t, good) => t + parseInt(good.estValue),
                    0
                );
                goodsTotalVal = goodsTotalVal < 1000 ? 1000 : goodsTotalVal;
            } else {
                goodsTotalVal = 1000;
            }
            var g = "Goods";

            console.log(goodsTotalVal);

            return {
                ...state,
                totalValue: goodsTotalVal,
                goodsArray: tempGoodsArr,
                goodType: g,
            };
        case "DELETE_GOOD":
            console.log("Success", action.type);

            const newGoodsArr = [...state.goodsArray].filter((good) => {
                return good.Good !== action.goodName;
            });

            return {
                ...state,
                goodsArray: newGoodsArr,
            };
        // Adding the total value of the house in case of sharing rent method.
        case "UPDATE_TOTAL_VALUE":
            console.log("Success ", action.type);
            var newTotal = action.i;

            return {
                ...state,
                totalValue: newTotal,
            };
        // For adding money to share in case of divorce method.
        case "UPDATE_MONEY_TO_SHARE":
            console.log("Success ", action.type);
            var newMoneyAmount = action.moneyAmount;

            return {
                ...state,
                moneyAmount: newMoneyAmount,
            };
        case "UPDATE_VALUATIONS":
            console.log("Success", action.type);

            // Create array of objects based on how many goods there are.
            var tempUpdatedArr = action.updatedArr;

            return {
                ...state,
                goodsArray: tempUpdatedArr,
            };
        case "RESET":
            console.log("Success", action.type);

            return {
                ...state,
                goodsArray: [],
                totalValue: 0,
                moneyAmount: 0,
                goodType: "",
            };
        default:
            return state;
    }
};

export default distGoodsInfoReducer;
