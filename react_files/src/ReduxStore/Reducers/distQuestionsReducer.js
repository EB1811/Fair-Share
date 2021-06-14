const initState = {
    shareMethod: null,
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
