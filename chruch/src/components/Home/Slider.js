import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {database} from '../../App'; 
import Loader from '../util/Loader';

class Slider extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        index: 0,
        direction: null,
        slider: false
      };
    }
    componentWillMount() {
      database.ref('Slider/').once('value',(snapshot) => {
        this.setState({slider: snapshot.val()})
      });
    }
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
      let jsx = <Loader />;
      if(this.state.slider) {
        jsx = this.state.slider.map(val => {
          if(val.enable === true) { 
            return (
              <Carousel.Item>
                  <img
                    className="Slider-img"
                    src={val.src}
                    alt={val.name}
                  />
                  <Carousel.Caption>
                    <h3>{val.h1}</h3>
                    <p>{val.p}</p>
                  </Carousel.Caption>
              </Carousel.Item>
            )
          }  
        });
      }
      return (
        <div className="Slider flex-h">
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
            {jsx}
          </Carousel>
        </div>
      );
    }
  }

export default Slider;