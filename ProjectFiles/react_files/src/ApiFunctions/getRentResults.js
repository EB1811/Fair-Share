//* API accepts JSON format with a matrix representing each user as a row, and each good as a column. Row, Column = user valuation.
//* Must be a square matrix.
/*
e.g.,
{
    "valueMatrix": 
    [ 
        [500, 100, 700], 
        [1000, 200, 800], 
        [100, 500, 1000]
    ]
}
//* Returns list of objects - [{who: Row-Of-Value-Matrix, room: Column-Of-Value-Matrix, price: number, }...]
*/
export const getRentResults = async (valueMatrix, totalCost) => {
    const fetchURL =
        "https://fair-share-allocation-api.herokuapp.com/api/getRoomsAllocation";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
            valueMatrix: valueMatrix,
            totalCost: totalCost,
        }),
    };

    const data = await fetch(fetchURL, requestOptions);
    const result = await data.json();
    return result;
};
