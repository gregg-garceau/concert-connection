/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Home(props) {
  return (
    <>
      <div className="container-fluid g-0">
        <div className="row g-0">
          <div className="homepage-header">
          </div>
        </div>
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="Card image cap"></img>
              <div className="card-body cornflower">
                <p className="card-text white-txt crete text-center">Concert Connection helps bring you all the information you need for the avid concert goer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="https://i.pinimg.com/originals/72/30/ed/7230ed3c46cc9075ab8cccfcf07ad6ff.jpg" alt="Card image cap"></img>
              <div className="card-body cornflower">
                <p className="card-text white-txt crete text-center">Search for all your favorite artists' events or events at a venue near you</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src="https://fyi.extension.wisc.edu/safefood/files/2020/03/sars-cov-19.jpg" alt="Card image cap"></img>
              <div className="card-body cornflower">
                <p className="card-text white-txt crete text-center">Concert Connection also tracks Covid-19 trends for the area of the event!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
