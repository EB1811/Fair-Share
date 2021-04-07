//* API accepts JSON format with a matrix representing each user as a row, and each good as a column. Row, Column = user valuation.
/*
e.g.,
{
    "valueMatrix": 
    [ 
        [500, 100, 700, 1], 
        [1000, 200, 800, 5], 
        [100, 500, 1000, 100]
    ]
}
//* Returns list of objects - [{who: Row-Of-Value-Matrix, goodsArray: [Column-Of-Value-Matrix]}...]
*/
export const getGoodsResults = async (valueMatrix) => {
    const fetchURL =
        "https://fair-share-allocation-api.herokuapp.com/api/getGoodsAllocation";
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

    const data = await fetch(fetchURL, requestOptions);
    const result = await data.json();
    return result;
};
