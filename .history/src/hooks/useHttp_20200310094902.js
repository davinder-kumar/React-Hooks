import { useReducer, useCallback, useEffect } from "react"

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return {
                ...state,loading: true, error: null, data: null
            }
        case "RESPONSE":
            return {
                ...state,loading: false, error: null, data: action.data,actionName:action.actionName
            }
        case "ERROR":
            return {
                ...state,loading: true, error: action.errorMessage, data: null
            }
        case "TEST":
            return {
                ...state, test: new Date()
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
        actionName: ''
    })
    useEffect(() => {
        console.log("Hook executed", stateHttp)
    }, [stateHttp])

    
    const sendRequest = useCallback((url, method, body,actionName) => {
        dispatchHttp({ type: "SEND" });
        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body:  JSON.stringify(body)
        })
            .then((response) => {
                return response.json()
            })
            .then((resData) => {
                dispatchHttp({ type: "RESPONSE", data: {...body, id:resData.name }, actionName: actionName });
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
        sendRequest: sendRequest,
        actionName: stateHttp.actionName
    }
}
export default useHttp