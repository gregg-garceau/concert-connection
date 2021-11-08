/* eslint-disable camelcase */
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    fetch(`https://api.seatgeek.com/2/events/${this.props.eventId}?client_id=MjQyNjE3MTd8MTYzNTk2NTg3MS40NzI3Mjg3`)
      .then(res => res.json())
      .then(event => this.setState({ event }));
  }

  render() {
    if (!this.state.event) return null;
    const {
      short_title, datetime_local, venue, performers
    } = this.state.event;
    const year = datetime_local.slice(0, 4);
    const month = datetime_local.slice(5, 7);
    const day = datetime_local.slice(8, 10);
    const lat = venue.location.lat;
    const lng = venue.location.lon;
    const center = {
      lat: lat,
      lng: lng
    };
    return (
      <div className="container">
        <div className="card shadow my-5">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <a href="#" className="btn text-secondary">
                  &lt; Home Page
                </a>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <LoadScript
                  googleMapsApiKey="AIzaSyBgxhRhkLySMNvsoH2O8p7XM3YfEWgDJng"
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                  >
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <h2>{short_title}</h2>
                <p>{performers[0].name}</p>
                <p>{venue.name}</p>
                <p>{venue.display_location}</p>
                <p>{month}/{day}/{year}</p>
                <p>Covid-19 Trend: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
