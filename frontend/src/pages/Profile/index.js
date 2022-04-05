import React from 'react';
import { FiPower } from 'react-icons/fi';

import './styles.css';


export default function Profile() {
    const userName = localStorage.getItem('userName');

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {userName} </span>
                <button type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
        
        </div>

        )
}