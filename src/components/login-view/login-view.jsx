import React, { useState } from "react";

import { LoginView } from '../login-view/login-view';

export function LoginView(props) {
  //useState method is called and assigned to destructured variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
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
      </form>
  );
}
