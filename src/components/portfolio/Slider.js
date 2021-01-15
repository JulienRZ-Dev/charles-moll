import React, { useState } from 'react';
import i1 from "../../assets/images/photoclub.jpg";
import i2 from "../../assets/images/animaux.jpg"
import i3 from "../../assets/images/art.jpg"
import i4 from "../../assets/images/avion.jpg"
import i5 from "../../assets/images/nature.jpg"
import i6 from "../../assets/images/viesociale.jpg"
import i7 from "../../assets/images/voyages.jpg"
import i8 from "../../assets/images/france.jpg"
import i9 from "../../assets/images/famille.jpg"

import { Link } from "react-router-dom";


function Slider() {

    // VARIABLES
    let sliderArr = [
        i1, i2, i3, i4, i5, i6, i7, i8, i9
    ];

    const [y1, setY1] = useState(8);
    const [count, setCount] = useState(0);
    const carousselDivIndex = [
        {name: "zero", index: 0},
        {name: "one", index: 1},
        {name: "two", index: 2},
        {name: "three", index: 3},
        {name: "four", index: 4},
        {name: "five", index: 5},
        {name: "six", index: 6},
        {name: "seven", index: 7},
        {name: "eight", index: 8}
    ];

    var divStyle = {
        backgroundImage: 'url(' + sliderArr[count] + ')',
    };




    // GO PREVIOUS ZONE
    function goTop() {
        setY1(((y1 + 10) % (9)));
        setCount((count + sliderArr.length - 1) % sliderArr.length);

        var zoneTextArray = document.getElementById("divzone").childNodes;

        for (let i = 0; i < 10; i++) {
            zoneTextArray[i].style.color = "rgba(255, 255, 255, 0.4)";
        }
        if (count == 0) {
            zoneTextArray[9].style.color = "white";
        } else if (count == 1) {
            zoneTextArray[1].style.color = "white";
        } else {
            zoneTextArray[count].style.color = "white";
        }

        var previewArray = document.getElementById("dotsdiv").childNodes;
        for (let j = 0; j < 9; j++) {
            previewArray[j].style.opacity = "0.7";
        }
        if (count == 0) {
            previewArray[8].style.opacity = "1";
        } else {
            previewArray[count - 1].style.opacity = "1";
        }
    };

    // GO NEXT ZONE
    function goBottom() {
        setY1(((y1 + 8) % (9)));
        setCount((count + sliderArr.length + 1) % sliderArr.length);

        var zoneTextArray = document.getElementById("divzone").childNodes;
        for (let i = 0; i < 11; i++) {
            zoneTextArray[i].style.color = "rgba(255, 255, 255, 0.4)";
        }
        if (count == 8) {
            zoneTextArray[1].style.color = "white";
        } else {
            zoneTextArray[count + 2].style.color = "white";
        }

        var previewArray = document.getElementById("dotsdiv").childNodes;
        for (let j = 0; j < 9; j++) {
            previewArray[j].style.opacity = "0.7";
        }
        if (count == 8) {
            previewArray[0].style.opacity = "1";
        } else {
            previewArray[count + 1].style.opacity = "1";
        }
    };


    function goIndex(index) {
        setY1(8 - index);
        setCount(index);
        var zoneTextArray = document.getElementById("divzone").childNodes;
        var previewArray = document.getElementById("dotsdiv").childNodes;

        for (let i = 0; i < 11; i++) {
            zoneTextArray[i].style.color = "rgba(255, 255, 255, 0.4)";
        }

        zoneTextArray[index + 1].style.color = "white";

        for (let j = 0; j < 9; j++) {
            previewArray[j].style.opacity = "0.7";
        }

        previewArray[index].style.opacity = "1";
    }




    return (
        <div>
            <div id="slider" className='slider poppins' style={divStyle}>

                <div id="divzone" className="divzone">

                    <Link to={"/famille" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Famille
                    </Link>
                    <Link to={"/photoclub" } className="zoneSlider start" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Photoclub
                    </Link>
                    <Link to={"/animaux" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Animaux
                    </Link>
                    <Link to={"/art" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Art
                    </Link>
                    <Link to={"/avion" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Aviation
                    </Link>
                    <Link to={"/nature" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Nature
                    </Link>
                    <Link to={"/viesociale" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Vie sociale
                    </Link>
                    <Link to={"/voyages" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Voyages
                    </Link>
                    <Link to={"/france" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        France
                    </Link>
                    <Link to={"/famille" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Famille
                    </Link>
                    <Link to={"/photoclub" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Photoclub
                    </Link>
                    <Link to={"/animaux" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Animaux
                    </Link>
                    <Link to={"/art" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Art
                    </Link>
                    <Link to={"/avion" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Aviation
                    </Link>
                    <Link to={"/nature" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Nature
                    </Link>
                    <Link to={"/viesociale" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Vie sociale
                    </Link>
                    <Link to={"/voyages" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Voyages
                    </Link>
                    <Link to={"/france" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        France
                    </Link>
                    <Link to={"/famille" } className="zoneSlider" style={{ transform: `translateY(${30 * y1}vh)` }}>
                        Famille
                    </Link>
                </div>

                <button id="goTop" onClick={() => goTop()}></button>
                <button id="goBottom" onClick={() => goBottom()}></button>

                <div id="dotsdiv" className="dotsdiv">
                    { carousselDivIndex.map((item) => {
                        return(
                            <div onClick={() => goIndex(item.index)} className={"dots " + item.name}></div>
                        );
                    })}    
                </div>

            </div>
            <div className="parallax3"></div>
        </div>
    );
}

export default Slider;