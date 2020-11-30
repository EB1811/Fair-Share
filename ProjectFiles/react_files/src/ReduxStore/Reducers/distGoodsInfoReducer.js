const initState = {
    temp2: []
}

const distGoodsInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GOODS_ACTION1':
            console.log("Success", action.i)

            // Create array of objects based on how many goods there are.
            var tempArr = [];
            var good;
            var i;
            for(i = 0; i < action.i; i++){
                good = {Good: "Room " + (parseInt(i) + 1), Value: 0}
                tempArr.push(good);
            }

            return {
                temp2: tempArr
            };
        case 'GOODS_ACTION2':
            console.log("Error ", action.err)
            return state
        default:
            return state;
    }
}

export default distGoodsInfoReducer;