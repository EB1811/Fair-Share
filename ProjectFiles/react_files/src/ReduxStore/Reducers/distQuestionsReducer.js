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
    switch (action.type) {
        case "SET_SHARE_METHOD":
            console.log("Success", action.type);

            const newShareMethod = action.method;

            return {
                ...state,
                shareMethod: newShareMethod,
            };
        default:
            return state;
    }
};

export default distQuestionsReducer;
