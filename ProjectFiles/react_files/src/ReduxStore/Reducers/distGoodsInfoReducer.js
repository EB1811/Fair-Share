const initState = {
    goodsArray: [],
    totalValue: 0
}

const distGoodsInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_GOODS_AMOUNT':
            console.log("Success", action.i);

            // Create array of objects based on how many goods there are.
            var tempArr = [];
            var good;
            var i;
            for(i = 0; i < action.i; i++){
                good = {Good: "Room " + (parseInt(i) + 1), Value: 0}
                tempArr.push(good);
            }

            return {
                ...state,
                goodsArray: tempArr
            };
        case 'UPDATE_TOTAL_VALUE':
            console.log("Success ", action.i);
            var newTotal = action.i;

            return {
                ...state,
                totalValue: newTotal
            };
        default:
            return state;
    }
}

export default distGoodsInfoReducer;