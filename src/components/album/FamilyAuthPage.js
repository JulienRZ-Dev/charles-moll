import React from 'react';
import UserAuthForm from '../utils/UserAuthForm';

function FamilyAuthPage() {
    
    return(
        <div className="familyAuthPageContainer">
            <h1 className="title white titleBig familyTitle">La Famille</h1>
            <UserAuthForm />
        </div>
    );
}

export default FamilyAuthPage