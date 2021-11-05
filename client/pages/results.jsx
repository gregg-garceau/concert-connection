/* eslint-disable camelcase */
import React from 'react';

function Result(props) {
  const { short_title, venue, url, datetime_local } = props.concert;
  const year = datetime_local.slice(0, 4);
  const month = datetime_local.slice(5, 7);
  const day = datetime_local.slice(8, 10);
  return (
    <a
      href={url}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <div className="card-body cornflower rounded shadow">
        <h5 className="card-title white-txt">{short_title}</h5>
        <p className="card-text white-txt">{venue.display_location}</p>
        <p className="card-text white-txt">{month}/{day}/{year}</p>
      </div>
    </a>
  );
}

function Results(props) {
  const searchTerm = props.search;
  return (
    <div className="container">
      <h1 className="my-3 white-txt crete outline header-txt text-capitalize">Search results for: {searchTerm}</h1>
      <div className="row">
        {
          props.concerts.map(concert => {
            return (
              <div key={concert.id} className="col-12 col-md-6 col-lg-6">
                <Result concert={concert} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Results;
