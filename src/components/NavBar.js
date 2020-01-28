import React from 'react'
import {NavLink} from "react-router-dom";

export const NavBar = () => (
    <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
        <div className="navbar-brand">
            Note App
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/"
                    exact
                >Главная </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/about">Информация </NavLink>
            </li>
        </ul>
    </nav>

)
