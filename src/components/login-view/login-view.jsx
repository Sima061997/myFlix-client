import React, { useState } from "react";
import PropTypes from 'prop-types';
export function LoginView(props) {
  //useState method is called and assigned to destructured variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Send a request to the server for authentication */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    
    /*onLoggedIn called from main-view */
     props.onLoggedIn(username);
  };

  return (
      <form>
        <p>Do you have already an Account?</p>
          <label>
              Username:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label >
              Password: 
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={ handleSubmit }>Submit</button> 
          <br /> 
          <br />
          <button type="button">Login without Registraton</button>
      </form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}