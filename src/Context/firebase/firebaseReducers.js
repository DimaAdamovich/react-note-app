import {ADD_NOTE, FETCH_NOTES, HIDE_LOADER, REMOVE_NOTE, SHOW_LOADER} from "../type";

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [HIDE_LOADER]: state => ({...state, loading: false}),
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note=> note.id !== payload)
    }),
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}