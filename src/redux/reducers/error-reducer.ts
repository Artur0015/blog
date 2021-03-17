import {InferActionsType} from "../common-types";

const initialState = null as string | null

type InitialStateType = typeof initialState

export const errorReducer = (state: InitialStateType = initialState, action: ErrorActionsType) => {
    switch (action.type) {
        case 'errorReducer/setError':
            return action.message
        case 'errorReducer/deleteError':
            return null
        default:
            return state
    }
}

export const errorActions = {
    setError: (message: string) => ({message, type: 'errorReducer/setError'} as const),
    deleteError: () => ({type: 'errorReducer/deleteError'} as const)
}

export type ErrorActionsType = InferActionsType<typeof errorActions>