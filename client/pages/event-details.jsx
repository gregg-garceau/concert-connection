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
      event: null,
      level: null
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.seatgeek.com/2/events/${this.props.eventId}?client_id=MjQyNjE3MTd8MTYzNTk2NTg3MS40NzI3Mjg3`)
      .then(res => res.json())
      .then(event => {
        fetch(`https://api.covidactnow.org/v2/state/${event.venue.state}.json?apiKey=5c0694cbb96c4c328b917a548dc3ac86`)
          .then(res => res.json())
          .then(data => this.setState({
            level: data.cdcTransmissionLevel,
            event: event
          }));
      });
  }

  handleFavorite(event) {
    const {
      short_title, datetime_local, venue, performers, id
    } = this.state.event;
    const year = datetime_local.slice(0, 4);
    const month = datetime_local.slice(5, 7);
    const day = datetime_local.slice(8, 10);

    const newFavorite = {
      eventName: short_title,
      artistName: performers[0].name,
      venueName: venue.name,
      eventLocation: venue.display_location,
      eventDate: `${month}/${day}/${year}`,
      covidRisk: this.state.level.toString(),
      resultId: id
    };

    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFavorite)
    })
      .then(res => res.json())
      .then(
        data => {
          // eslint-disable-next-line no-console
          console.log(data);
        });
  }

  getRiskLevel() {
    const level = this.state.level;
    if (level === 0) {
      return 'LOW';
    } else if (level === 1) {
      return 'MODERATE';
    } else if (level === 2) {
      return 'SUBSTANTIAL';
    } else if (level === 3) {
      return 'HIGH';
    } else {
      return 'UNKNOWN';
    }
  }

  riskColor() {
    const level = this.state.level;
    if (level === 0) {
      return 'green';
    } else if (level === 1) {
      return 'yellow';
    } else if (level === 2) {
      return 'orange';
    } else if (level === 3) {
      return 'red';
    } else {
      return 'purple';
    }
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
        <div className="card shadow my-5 crete">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <a href="#" className="btn text-secondary">
                  &lt; Home Page
                </a>
              </div>
              <div className="col">
                <a className="btn text-secondary" onClick={this.handleFavorite}>
                  &hearts; Favorite
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
                <h2 className="title-txt">{short_title}</h2>
                <p>{performers[0].name}</p>
                <p>{venue.name}</p>
                <p>{venue.display_location}</p>
                <p>{month}/{day}/{year}</p>
                <p>Covid-19 Risk: <span className={this.riskColor()}>{this.getRiskLevel()}</span></p>
                <p>(See <a className="text-decoration-none" href="https://covid.cdc.gov/covid-data-tracker/#cases_community">CDC Covid Data Tracker</a> for more details)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
