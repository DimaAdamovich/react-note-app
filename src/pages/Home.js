import React, {useContext, useEffect} from 'react'
import {Form} from "../components/Form";
import {Notes} from "../components/Notes";
import {Alert} from "../components/Alert";
import {FirebaseContext} from "../Context/firebase/firebaseContext";
import {Loader} from "../components/Loading";
import {AlertContext} from "../Context/alert/alertContext";

export const Home = () => {
    const {notes, loading, fetchNotes, removeNote} = useContext(FirebaseContext)
    const alert = useContext(AlertContext)
    useEffect (()=> {
        fetchNotes().catch( ()=>
            alert.show('Ошибка на сервере', 'danger')
        )
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Alert />
            <Form/>
            <hr/>
            {loading ? <Loader/> : <Notes notes={notes} showAlert={alert.show} removeNote={removeNote}/>}

        </div>
    )
}