import React, { useEffect } from 'react';
import clear from '../../assets/icons/clear.svg';

function Modal(props) {

    useEffect(() => {
        if(props.modalVisible) {
            document.getElementsByTagName("html")[0].classList.add("html-not-scrollable");
            document.getElementsByTagName("body")[0].classList.add("body-not-scrollable");
        } else {
            document.getElementsByTagName("html")[0].classList.remove("html-not-scrollable");
            document.getElementsByTagName("body")[0].classList.remove("body-not-scrollable");
        }
    }, [props.modalVisible])


    return (
        <div>
            { props.modalVisible ?
                <div id="modalExt">
                    <div id="modalInt">
                        <img
                            id="modalClear"
                            onClick={props.handleClose}
                            src={clear}
                            alt="quit pop-up"
                        />
                        {props.children}
                    </div>
                </div> :
                null
            }
        </div>
    );
}


export default Modal;