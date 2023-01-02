import React, {useState} from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const login = (accessToken, refreshToken) => {

    axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
    setAuthState({ accessToken, refreshToken });
    console.log(accessToken)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    // baseURL: 'https://airbnb-clone-apis.onrender.com',

    const payload ={
      email, password 
    }

    try{
      console.log(email, password)
      let response = await axios.post('https://airbnb-clone-apis.onrender.com/auth/login', payload )
      console.log(response)

      if(response){
        login(response.data.accessToken, response.data.refreshToken);
      }
  
        
    }catch (err){
      console.log('not working' + err)
    } 
      
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" />
          <input type="text" name="password" />
          <button type='submit'>login</button>
        </form>
      </div>
    </div>
  );
}
