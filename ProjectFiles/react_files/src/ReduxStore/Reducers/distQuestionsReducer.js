const initState = {
    shareMethod: null,
    userValues: [
        {
            question: "Question 1",
            answer: "",
        },
        {
            question: "Question 2",
            answer: "",
        },
        {
            question: "Question 3",
            answer: "",
        },
    ],
};

const distQuestionsReducer = (state = initState, action) => {
    var tempArr = [];
    switch (action.type) {
        case "SET_SHARE_METHOD":
            console.log("Success", action.type);

            const newShareMethod = action.method;

            return {
                ...state,
                shareMethod: newShareMethod,
            };
        case "Question 1":
            console.log("Success", action.ans);

            // Create copy array but with answer of the quesion.
            tempArr = [];
            state.userValues.forEach((e) => {
                if (e.question === "Question 1") {
                    tempArr.push({
                        question: "Question 1",
                        answer: action.ans,
                    });
                } else {
                    tempArr.push(e);
                }
            });

            return {
                ...state,
                userValues: tempArr,
            };
        case "Question 2":
            console.log("Success", action.ans);

            // Create copy array but with answer of the quesion.
            tempArr = [];
            state.userValues.forEach((e) => {
                if (e.question === "Question 2") {
                    tempArr.push({
                        question: "Question 2",
                        answer: action.ans,
                    });
                } else {
                    tempArr.push(e);
                }
            });

            return {
                ...state,
                userValues: tempArr,
            };
        case "Question 3":
            console.log("Success", action.ans);

            // Create copy array but with answer of the quesion.
            tempArr = [];
            state.userValues.forEach((e) => {
                if (e.question === "Question 3") {
                    tempArr.push({
                        question: "Question 3",
                        answer: action.ans,
                    });
                } else {
                    tempArr.push(e);
                }
            });

            return {
                ...state,
                userValues: tempArr,
            };
        default:
            return state;
    }
};

export default distQuestionsReducer;
