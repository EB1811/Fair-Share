// Determine if user wants to share locally or remotely.
const setShareMethod = (method) => {
    return {
        type: "SET_SHARE_METHOD",
        method: method,
    };
};

export default {
    setShareMethod,
};
