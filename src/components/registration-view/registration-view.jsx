import React, { useState } from "react";
import PropTypes from 'prop-types';

import { LoginView } from "../login-view/login-view";
 
export function RegistrationView(props) {
    //useState method is called and assigned to destructured variables
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password, email, dateOfBirth);
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
       props.onRegistration(username);
    };

    return (
        <form>
            <p>Please Register</p>   
          <label>
              Username:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label >
              Password: 
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
              EmailAddress:
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
              DateOfBirth:
              <input type="text" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
          </label>
          <button type="submit" onClick={ handleSubmit }>Submit</button>
      </form>   
    );

  }