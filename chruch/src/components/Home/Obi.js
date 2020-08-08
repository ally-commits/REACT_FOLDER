import React, { Component } from 'react'; 
import {database} from '../../App'; 
import Loader from '../util/Loader';
 
class Obi extends Component {
  constructor() {
    super();
    this.state = {
      obi: false
    }
  }
  componentWillMount() {
    database.ref('Obi/').once('value',(snapshot) => {
        this.setState({obi: snapshot.val()})
    });
  }
  render() {
    let jsx = <Loader />;
    if(this.state.obi) {
      jsx = this.state.obi.map(val => {
        return (
          <div class="O-box O-edit">
              <img src={val.img} className="O-box-img" />
              <h1 className="O-box-h1">{val.name}</h1>
              <h1 className="O-box-span">{val.from} - {val.to}</h1>
              <h1 className="O-box-desc">{val.desc}</h1>
          </div>
        )
      });
    }
    return (
      <div className="Place flex-h">
          <div className="Place-obi flex-v ">
            <h1 className="head-mark">Obitury</h1>
            <div className="flex-h sp-ar wrap">{jsx}</div>
          </div>
      </div>
    )
  }
}
export default Obi;