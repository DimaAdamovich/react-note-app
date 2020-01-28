import React, {useState, useContext} from 'react'
import {AlertContext} from "../Context/alert/alertContext";
import {FirebaseContext} from "../Context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const {addNote} = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()
        if(value.trim()) {
            addNote(value.trim()).then( () =>
                alert.show('Заметка была создана', 'success')
            ).catch( ()=>
                alert.show('Что-то пошло не так', 'danger')
            )
        }
        else {
            alert.show('Введите название заметки')
        }
        setValue('')
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    className='form-control'
                    type="text"
                    placeholder='Введите название заметки'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}