import React, { Component } from 'react';

import Navbar from './Navbar';
import Home from './Home';
import Codeurs from './codeurs';
import Bio from './bio';
import Slider from './Slider';
import Contact from './contact';
import Footer from './footer';


class Portfolio extends Component {

    render() {
        return (
            <div className="App">
                <Navbar />
                <Home />
                <Codeurs />
                <Bio />
                <Slider />
                <Contact />
                <Footer />
            </div>
        );
    }
}

export default Portfolio;
