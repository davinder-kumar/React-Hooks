import { useReducer, useCallback, useEffect } from "react"

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true, error: null, data: null
            }
        case "RESPONSE":
            return {
                loading: false, error: null, data: action.data
            }
        case "ERROR":
            return {
                loading: true, error: action.errorMessage, data: null
            }
        case "TEST":
            return {

            }
        default:
            throw new Error("Pass invalid action")
    }
}

const useHttp = () => {

    const [stateHttp, dispatchHttp] = useReducer(httpReducer, {
        error: null,
        loading: false,
        data: null,
        test: ''
    })
    useEffect(() => {
        console.log("Hook executed", stateHttp)
    }, [stateHttp])

    const doTest = () => {
        dispatchHttp({ type: "TEST" })
    }
    const sendRequest = useCallback((url, method, body) => {
        dispatchHttp({ type: "SEND" });
        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: body
        })
            .then((response) => {
                return response.json()
            })
            .then((resData) => {
                dispatchHttp({ type: "RESPONSE", data: resData });
                // dispatch({ type: "ADD", ingredient: { ...ingredient, id: resData.name } })
            })
            .catch((error) => {
                dispatchHttp({ type: "ERROR", error: error.message });
            })
    }, [])

    return {
        data: stateHttp.data,
        loading: stateHttp.loading,
        error: stateHttp.error,
        sendRequest: sendRequest
    }
}
export default useHttp