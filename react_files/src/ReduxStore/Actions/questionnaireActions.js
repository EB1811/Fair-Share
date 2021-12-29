// Determine if user wants to share locally or remotely.
const setShareMethod = (method) => {
    return {
        type: "SET_SHARE_METHOD",
        method: method,
    };
};

// eslint-disable-next-line
export default {
    setShareMethod,
};
