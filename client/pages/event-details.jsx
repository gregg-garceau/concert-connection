import React from 'react';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    fetch(`https://api.seatgeek.com/2/events/${this.props.eventId}`)
      .then(res => res.json())
      .then(event => this.setState({ event }));
  }

  render() {
    if (!this.state.product) return null;
    const {
      name, imageUrl, price, shortDescription, longDescription
    } = this.state.product;
    return (
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <a href="#" className="btn text-secondary">
                  &lt; Back to catalog
                </a>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 col-sm-6 col-md-7">
                <h2>{name}</h2>
                <h5 className="text-secondary"></h5>
                <p>{shortDescription}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  {longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
