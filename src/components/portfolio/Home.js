import React from 'react';

import { HashLink } from 'react-router-hash-link';

import logo from '../../assets/images/logo.png';

const Home = () => {

    return (
        <div>

            <div className='accueil'>
                <img className="logo" src={logo} alt="charles moll"></img>
            </div>


            <div id="animation" className="animation">
                <div id="circle" className={"circle"}>
                    <div id="bot" className={"bot"}></div>
                    <div id="ajust" className={"ajust"}>
                        <div id="center" className={"center"}></div>
                    </div>
                    <div id="top" className={"top"}></div>
                </div>
                <div id="translation" className={"translation"}>
                    <svg id="rotation" className={"rotation"} width="110" height="110" viewBox="-8.5 -8.5 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Subtract">
                            <path id="focalone" className={"focalone"} id="onefix" d="M103.631 28.5C95.7073 14.7752 82.7611 5.75765 68.4542 2.42849L48.1451 37.6049C50.7969 36.4687 53.5904 35.9498 56.3458 36H107.243C106.244 33.4505 105.042 30.9437 103.631 28.5Z" fill="white" />
                            <path id="focaltwo" className={"focaltwo"} id="twofix" d="M73.3204 46C71.9268 43.5861 70.1059 41.5727 68.0085 40H108.634C113.958 57.4588 110.162 76.368 98.9457 90.3844L73.3204 46Z" fill="white" />
                            <path id="focalthree" className={"focalthree"} id="threefix" d="M28.4999 8.36865C39.7631 1.86584 52.3703 -0.200445 64.2978 1.62756L38.8706 45.6688C37.4088 48.0975 36.482 50.8081 36.1425 53.606L15.8253 18.4155C19.4414 14.5529 23.6804 11.1512 28.4999 8.36865Z" fill="white" />
                            <path id="focalfour" className={"focalfour"} id="fourfix" d="M96.1746 93.5846C92.5584 97.4471 88.3194 100.849 83.4999 103.631C72.2367 110.134 59.6296 112.201 47.702 110.372L73.1283 66.3327C74.5907 63.9036 75.5177 61.1925 75.8573 58.394L96.1746 93.5846Z" fill="white" />
                            <path id="focalfive" className={"focalfive"} id="fivefix" d="M63.8546 74.3952L43.5456 109.572C29.2387 106.242 16.2925 97.2248 8.36851 83.5C6.95768 81.0564 5.75567 78.5495 4.75697 76H55.6528C58.4086 76.0505 61.2025 75.5316 63.8546 74.3952Z" fill="white" />
                            <path id="focalsix" className={"focalsix"} id="sixfix" d="M43.9913 72C41.8939 70.4274 40.0731 68.4139 38.6794 66L13.0541 21.6157C1.83782 35.632 -1.95818 54.5413 3.36582 72H43.9913Z" fill="white" />
                        </g>
                    </svg>
                </div>
                <div id="menu" className={"menu"}>
                    <div id="item1" className={"item1 poppins18"}><HashLink className="poppins15" to={"/#slider"}>Portfolio</HashLink></div>
                    <div id="item2" className={"item2 poppins18"}><HashLink className="poppins15" to={"/#bio"}>Qui suis-je</HashLink></div>
                    <div id="item3" className={"item3 poppins18"}><HashLink className="poppins15" to={"/#contact"}>Contact</HashLink></div>
                </div>
            </div>

            <div className="parallax1"></div>
        </div>
    )
}

export default Home