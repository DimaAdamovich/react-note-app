import React from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group";


export const Notes = ({notes, removeNote, showAlert}) => (
    <TransitionGroup component='ul' className="list-group">
        {[...notes].reverse().map(note => (
            <CSSTransition
                key={note.id}
                classNames={'note'}
                timeout={700}
            >
                <li className="list-group-item list-group-item-action note">
                    <div>
                        <strong>{note.title}</strong>
                        <small>{new Date(Date.parse(note.data)).toLocaleDateString()}</small>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                            showAlert('Заметка была удалена', 'success')
                            removeNote(note.id)
                        }}
                    >
                        &times;
                    </button>
                </li>
            </CSSTransition>
        ))}


    </TransitionGroup>

)