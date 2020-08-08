import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const style ={
  width: '94vw',
  height: '100%', 
  margin: '0 auto'
};

class Mapi extends Component {
  render() {
    return (
        <div className="Map flex-h">
            <Map 
              google={this.props.google} 
              zoom={14} 
              style={style}
              initialCenter = {{
                  lat: -1.2884,
                  lng: 36.8233
              }} 
            >
            </Map>
      </div>
    )
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAniBSi-rcSNQi3u7w2CnrHSE3EpyMfZjw'
})(Mapi);
