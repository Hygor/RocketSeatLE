import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';
import logo from '../assets/logo.svg';

function Login({ history }) {

  const [username, setUsername ] = useState('');

  async function handleSubmit(e) {
    
    // prevent browser to reload the page
    e.preventDefault();
    
    const response = await api.post('/devs', { username });
    const {_id} = response.data;

    history.push(`/dev/${_id}`);
  }

  function handleInputChange(e) {
    setUsername(e.target.value)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="tindev"/>
        <input  value={username} 
                placeholder="digite seu usuário do github"
                type="text"
                onChange={handleInputChange}
                />
        <button type="submit">enviar</button>
      </form>
    </div>
  );
}

export default Login;