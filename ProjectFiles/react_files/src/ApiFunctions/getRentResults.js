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
*/
export const getRentResults = async (valueMatrix, totalCost) => {
    // [{who: number, room: number, price: number, }...]
    const fetchURL = "http://localhost:5000/api/getRoomsAllocation";
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

    fetch(fetchURL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch((err) => {
            Promise.reject(err);
        });
};
