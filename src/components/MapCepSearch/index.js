import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import { Map, TileLayer } from 'react-leaflet';
import Routing from './RoutingMachine';

class MapCepSearch extends Component {
  constructor() {
    super();
    this.state = {
      isMapInit: false,
    };
  }

  handleSaveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    const zoom = 18;

    return !this.props.isGeolocationAvailable ? (
      <div>O seu browser não suporta geolocalização</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocalização não está habilitada</div>
    ) : this.props.coords ? (
      <>
        <br />
        <Map
          center={[this.props.lattGeolocation, this.props.longtGeolocation]}
          zoom={zoom}
          ref={this.handleSaveMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.isMapInit && (
            <Routing
              map={this.map}
              lattSearch={this.props.coords.latitude}
              longtSearch={this.props.coords.longitude}
              lattGeolocation={this.props.lattGeolocation}
              longtGeolocation={this.props.longtGeolocation}
            />
          )}
        </Map>
      </>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true,
})(MapCepSearch);
