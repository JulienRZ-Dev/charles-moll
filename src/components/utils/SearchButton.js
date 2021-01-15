import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

import search from '../../assets/icons/search.png';
 
function SearchButton(props) {

    return(
        <button id={props.id} className="searchButton button" onClick={props.handleClick}>
            { props.loading ?
                <SyncLoader
                    size={8}
                    color={"#000"}
                    loading={true}
                /> :
                <img
                    className="searchIcon"
                    src={search}
                    alt="search icon"
                />
            }
            <p className="subtitle white">Rechercher</p>
            <p className="whiteSpace"></p>
        </button>
    );
}

export default SearchButton;