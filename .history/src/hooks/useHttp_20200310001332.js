
const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true, error : null
            }
            break
        case "RESPONSE":
            break
        case "ERROR":
            break
        default:
            throw new Error("Pass invalid action")
    }
}

const useHook = () => {

}