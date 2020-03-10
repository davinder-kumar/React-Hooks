import { useReducer } from "react"

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true, error: null
            }
            break
        case "RESPONSE":
            return {
                loading: false, error: null
            }
            break
        case "ERROR":
            return {
                loading: true, error: action.errorMessage
            }

            break
        default:
            throw new Error("Pass invalid action")
    }
}

const useHook = () => {
    const [stateHttp,dispatchHttp] = useReducer(httpReducer, {
        error: null,
        loading: false
    })

    const sendRequest = (url, method, body) => {
        dispatchHttp({type: "SEND"});
        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: body
        })
            .then((response) => {
                
                return response.json()
            })
            .then((resData) => {
                dispatchHttp({type: "RESPONSE"});
                // dispatch({ type: "ADD", ingredient: { ...ingredient, id: resData.name } })
            })
            .catch((error) => {
                SetErrorStatus(error.message)
            })
    }
}