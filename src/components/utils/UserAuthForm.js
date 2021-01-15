import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import Button from './Button';

import { UserAuthContext } from '../../contexts/UserAuthContext';

import { userAuth } from '../../firebase/auth';

function UserAuthForm() {
    
    const [password, setPassword] = useState("");
    const { userAuthState, setUserAuthState } = useContext(UserAuthContext);

    function handleChange(value) {
        setPassword(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        userAuth(password, handleAuthResult);
    }

    function handleAuthResult(success) {
        if(success) {
            console.log("success");
            setUserAuthState(true);
        }
    }


    return(
        <div>
            { userAuthState ?
                <Redirect to="/famille" /> :
                <form className="userAuthForm" onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="title white userAuthFormTitle">CODE FAMILLE</h1>
                    <input className="input basicInput" placeholder="Mot de passe" type="password" onChange={(e) => handleChange(e.target.value)} />
                    <Button className="userAuthFormButton" content="Valider" />
                </form>
            }
        </div>
    );
}

export default UserAuthForm;