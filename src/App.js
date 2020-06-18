import React from 'react';
import './App.css';
import {AuthContext} from './AuthContext';

function App({match: {params: { redirect }}}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const {login} = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = await login(email, password)
    // alert(redirect);
    if(!err) {
      window.location.href = decodeURIComponent(redirect) || 'http://localhost:3001';
    } else {
      setError(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>テスト認証</h3>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default App;
