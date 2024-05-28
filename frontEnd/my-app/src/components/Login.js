import { useState } from 'react';
import axios from 'axios';

function Login(){

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();

        console.log (email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log(response.data);
            setUser(response.data);

        } catch ( error ) {
            if (!error?.response) {
                setError('Erro ao acessar o Servidor');
            } else if (error.response.status === 401) {
                setError('Usuario ou senha invalidos')
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
    }

    return(
      <div className="App">
        <header className="App-header">
                <div className="loginFormWrap">
                    {user == null ? (
                        <div>
                        
            <h2>Login</h2>
            <form className='loginForm'>
              <input type="email" 
              name="email" 
              placeholder="E-mail" 
              required
              onChange={(e) => setEmail (e.target.value)}/>

              <input type="password" 
              name="password" 
              placeholder="Senha" 
              required
              onChange={(e) => setPassword (e.target.value)}/>

              <button 
              type="submit" 
              className='btnLogin'
              onClick ={(e) => handleLogin (e)}>Login</button>

                    </form>
                            <p>{error}</p>
                                                    </div>
                    ) : (
                         
                    <div>
                                <h2>Olá, {user.name}</h2>
                                <button
                                    type="button"
                                    className='btnLogin'
                                    onClick={(e) => handleLogout(e)}
                                >Logout</button>
                    </div>  
          )}
         </div>
        </header>
      </div>
    );
  }

  export default Login;