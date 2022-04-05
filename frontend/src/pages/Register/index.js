import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {QRCodeSVG} from 'qrcode.react';
import api from '../../services/api'
import './styles.css';


export default function Register() {

    const [auth, setAuth] = useState([]);

    useEffect(() => {
        api.get('users').then(response => {
            setAuth(response.data);
        })
    }, []);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [googleAuth, setGoogleAuth] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            password,
            googleAuth,
        };
    
        

        try{
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro.</p>

                    <QRCodeSVG value={auth} />

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome de usuário" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        placeholder="GoogleAuth" 
                        value={googleAuth}
                        onChange={e => setGoogleAuth(e.target.value)}
                    />
                    <button className='button' type="submit">Registrar</button> 
                </form>
            </div>
        </div>

        )
}