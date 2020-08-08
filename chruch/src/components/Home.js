import React from 'react';
import Nav from './Home/Nav';
import Slider from './Home/Slider';
import News from './Home/News';
import People from './Home/People';
import Gallery from './Home/Gallery';
import Obi from './Home/Obi';
import Mapi from './Home/Mapi';
import Footer from './Home/Footer';

export default function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      <div className="section-content">
        <div className="bundle">
            <div className="section-pn flex-h sp-bt">
              <People />
              <News />
            </div>
            <Gallery />
            <Obi />
            <Mapi />
        </div>
        <Footer />
      </div>
    </div>
  )
}
