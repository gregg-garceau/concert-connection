import React from 'react';
import NavBar from './components/header';
import Home from './pages/home';
import Results from './pages/results';
import { parseRoute } from './lib';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      concerts: []
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const changedHash = parseRoute(window.location.hash);
      this.setState({
        route: changedHash
      });
    });
  }

  search(newSearch) {
    const artistName = newSearch.value;
    fetch('https://api.seatgeek.com/2/events?q=' + artistName + '&client_id=MjQyNjE3MTd8MTYzNTk2NTg3MS40NzI3Mjg3')
      .then(res => res.json())
      .then(
        concerts => {
          // This console log shows the data that the user will get from the search
          // eslint-disable-next-line no-console
          console.log(concerts);
        }
      );
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'results') {
      return <Results />;
    }
  }

  render() {
    return (
      <>
        <NavBar onSubmit={this.search}/>
        {this.renderPage()}
      </>
    );
  }
}
