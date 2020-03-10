
const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true, error : null
            }
            break
        case "RESPONSE":
            return {
                loading: true, error : null
            }
            break
        case "ERROR":
            return {
                loading: true, error : null
            }
            break
        default:
            throw new Error("Pass invalid action")
    }
}

const useHook = () => {

}