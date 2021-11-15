/* eslint-disable camelcase */
import React from 'react';

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(res => res.json())
      .then(saved => this.setState({ saved }));
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-3 white-txt crete outline header-txt">Saved Entries</h1>
        <hr />
        <div className="row">
          {
            this.state.saved.map(event => (
              <div key={event.eventId} className="col-12 col-md-6 col-lg-4 result">
                <Event event={event} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function Event(props) {
  const { eventName, artistName, venueName, eventLocation, eventDate, resultId } = props.event;
  const page = `#event?eventId=${resultId}`;

  return (
    <a
      href={page}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <div className="card-body cornflower rounded shadow">
        <h5 className="card-title white-txt"><u>{eventName}</u></h5>
        <p className="card-text white-txt">{artistName}</p>
        <p className="card-text white-txt">{venueName}</p>
        <p className="card-text white-txt">{eventLocation}</p>
        <p className="card-text white-txt">{eventDate}</p>
      </div>
    </a>
  );
}
