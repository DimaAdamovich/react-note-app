import React, {useReducer, useContext} from 'react'
import {FirebaseContext} from "./firebaseContext";
import axios from 'axios'
import {firebaseReducer} from "./firebaseReducers";
import {ADD_NOTE, FETCH_NOTES, HIDE_LOADER, REMOVE_NOTE, SHOW_LOADER} from "../type";
import {AlertContext} from "../alert/alertContext";

const url = process.env.REACT_APP_DB_URL


export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const {show} = useContext(AlertContext, )

    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    const fetchNotes = async () => {
        showLoader()
        try {
            let res = await axios.get(`${url}/notes.json`)
            if(res.data) {
                const payload = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    }
                })
                dispatch({type: FETCH_NOTES, payload})
            }
            else{
                hideLoader()
                show('Создайте вашу первую заметку', 'info')
            }

        }
        catch (e) {
            hideLoader()
            throw new Error(e.message)
        }

    }
    const addNote = async title => {
        const note = {
            title, data: new Date().toJSON()
        }
        try {
            let res = await axios.post(`${url}/notes.json`, note)
            if(state.notes.length=== 0) {
                fetchNotes()
            }
        const payload = {
            ...note,
            id: res.data.name
        }
            dispatch({type: ADD_NOTE, payload})
            console.log(state.notes)

        }
        catch (e) {
            throw new Error(e.message)
        }


    }
    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`)
        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }


    return <FirebaseContext.Provider value={{
    showLoader, fetchNotes, addNote, removeNote,
        loading: state.loading,
        notes: state.notes
    }}>
        {children}
    </FirebaseContext.Provider>
}