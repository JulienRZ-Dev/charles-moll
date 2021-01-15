import React, { useState, useContext } from "react";

import { signIn, signOut } from "../../firebase/auth";

import Button from "./Button";
import SyncLoader from "react-spinners/SyncLoader";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";

function AuthForm() {

  const { authState, setAuthState } = useContext(AuthContext);

  const [authStateMessage, setAuthStateMessage] = useState("await");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password, handleAuthResult);
    setAuthStateMessage("processing");
  }

  const handleAuthResult = (success) => {
    if (success) {
      setAuthStateMessage("success");
      setAuthState(true); // send auth state to App for context
    } else {
      setAuthStateMessage("failure");
      setAuthState(false); // send auth state to App for context 
    }
  }

  function handleSignOut() {
    signOut(handleSignOutResult);
  }

  function handleSignOutResult(success) {
    if (success) {
      setAuthStateMessage("signedOut");
      setAuthState(false);
    }
  }


  return (

    <div>
      {
        authState ?
          <div id="authForm">
            <h1 className="title authTitle">Administrateur</h1>
            <Button className="authButton signOutButton" type="submit" onClick={() => handleSignOut()} content="Se déconnecter" />
          </div> :

          <form id="authForm" onSubmit={(e) => handleSubmit(e)}>

            <h1 className="title authTitle">Administrateur</h1>
            <div className="inputGroup">
              <input className="adminInput" type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label paragraph">Email</label>
            </div>


            <div className="inputGroup">
              <input className="adminInput" type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label paragraph">Mot de passe</label>
            </div>

            <Button className="authButton signInButton" type="submit" content="S'identifier" />

            <div id="authMessageContainer">
              {authStateMessage === "success" ?
                <Redirect to="/" /> :
                authStateMessage === "signedOut" ?
                  <Redirect to="/" /> :
                  authStateMessage === "failure" ? <p className="failureMessage">Authentification échouchée...</p> :
                    authStateMessage === "await" ? <div></div> :
                      <SyncLoader
                        size={14}
                        color={"#000"}
                      />
              }
            </div>
          </form>
      }
    </div>

  );
}

export default AuthForm;