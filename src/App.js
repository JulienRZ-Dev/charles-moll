import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// PLACEHOLDER
import placeholderregular from './assets/images/flagplaceholder.png'; 
import placeholderphone from './assets/images/placeholderphone.png'; 

// PC BIG
import animauxBig from './assets/images/flaganimaux2100.png';
import artBig from './assets/images/flagart2100.png';
import avionBig from './assets/images/flagavion2100.png';
import familleBig from './assets/images/flagfamille2100.png';
import franceBig from './assets/images/flagfrance2100.png';
import natureBig from './assets/images/flagnature2100.png';
import photoclubBig from './assets/images/flagphotoclub2100.png';
import viesocialeBig from './assets/images/flagviesociale2100.png';
import voyagesBig from './assets/images/flagvoyages2100.png';


// PC
import animaux from './assets/images/flaganimaux1700.png';
import art from './assets/images/flagart1700.png';
import avion from './assets/images/flagavion1700.png';
import famille from './assets/images/flagfamille1700.png';
import france from './assets/images/flagfrance1700.png';
import nature from './assets/images/flagnature1700.png';
import photoclub from './assets/images/flagphotoclub1700.png';
import viesociale from './assets/images/flagviesociale1700.png';
import voyages from './assets/images/flagvoyages1700.png';


// TABLET
import animauxIpad from './assets/images/flaganimauxipad.png';
import artIpad from './assets/images/flagartipad.png';
import avionIpad from './assets/images/flagavionipad.png';
import familleIpad from './assets/images/flagfamilleipad.png';
import franceIpad from './assets/images/flagfranceipad.png';
import natureIpad from './assets/images/flagnatureipad.png';
import photoclubIpad from './assets/images/flagphotoclubipad.png';
import viesocialeIpad from './assets/images/flagviesocialeipad.png';
import voyagesIpad from './assets/images/flagvoyagesipad.png';


// PHONES
import animauxPhone from './assets/images/flaganimauxphone.png';
import artPhone from './assets/images/flagartphone.png';
import avionPhone from './assets/images/flagavionphone.png';
import famillePhone from './assets/images/flagfamillephone.png';
import francePhone from './assets/images/flagfrancephone.png';
import naturePhone from './assets/images/flagnaturephone.png';
import photoclubPhone from './assets/images/flagphotoclubphone.png';
import viesocialePhone from './assets/images/flagviesocialephone.png';
import voyagesPhone from './assets/images/flagvoyagesphone.png';


import { AuthContext } from './contexts/AuthContext';
import { UserAuthContext } from './contexts/UserAuthContext';

import AlbumPage from './components/album/AlbumPage';
import AuthForm from './components/utils/AuthForm';
import FamilyAuthPage from './components/album/FamilyAuthPage';
import Portfolio from './components/portfolio/Portfolio';

import { auth } from './firebase/config';
import useWindowDimensions from './hooks/useWindowDimensions';



function App() {

  const [authState, setAuthState] = useState(auth.currentUser !== null);
  const [userAuthState, setUserAuthState] = useState(false);
  const { width } = useWindowDimensions();

  const zones = [
    { name: "Animaux", link: "animaux", picture: width > 700 ? width > 1100 ? width > 1700 ? animauxBig : animaux : animauxIpad : animauxPhone },
    { name: "Art et Culture", link: "art", picture: width > 700 ? width > 1100 ? width > 1700 ? artBig : art : artIpad : artPhone },
    { name: "Aviation", link: "avion", picture: width > 700 ? width > 1100 ? width > 1700 ? avionBig : avion : avionIpad : avionPhone },
    { name: "Famille", link: "famille", picture: width > 700 ? width > 1100 ? width > 1700 ? familleBig : famille : familleIpad : famillePhone },
    { name: "France", link: "france", picture: width > 700 ? width > 1100 ? width > 1700 ? franceBig : france : franceIpad : francePhone },
    { name: "Nature", link: "nature", picture: width > 700 ? width > 1100 ? width > 1700 ? natureBig : nature : natureIpad : naturePhone },
    { name: "Photoclub", link: "photoclub", picture: width > 700 ? width > 1100 ? width > 1700 ? photoclubBig : photoclub : photoclubIpad : photoclubPhone },
    { name: "Vie Sociale", link: "viesociale", picture: width > 700 ? width > 1100 ? width > 1700 ? viesocialeBig : viesociale : viesocialeIpad : viesocialePhone },
    { name: "Voyages", link: "voyages", picture: width > 700 ? width > 1100 ? width > 1700 ? voyagesBig : voyages : voyagesIpad : voyagesPhone }
  ];

  const placeholder = width > 1000 ? placeholderregular : placeholderphone;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState(user !== null && user.uid === "wrdikO8SKudzndRsmu35HGBpzVQ2");
    });
    return () => null; // when unmounted we don't want to do anything
  }, []);


  return (
    <div className="App">
      
      <Router>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <UserAuthContext.Provider value={{ userAuthState, setUserAuthState }}>

            <Switch>
              {zones.map((zone) => {
                return (
                  <Route path={"/" + zone.link}>
                    <AlbumPage zone={zone.name} placeholder={placeholder} zonePicture={zone.picture} key={zone.name} />
                  </Route>
                );
              })}
              <Route path="/admin">
                <AuthForm setAuthState={setAuthState} />
              </Route>
              <Route path="/authentification">
                <FamilyAuthPage setUserAuthState={setUserAuthState} />
              </Route>
              <Route exactPath="/">
                <Portfolio />
              </Route>
            </Switch>



          </UserAuthContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
