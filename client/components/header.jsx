import React from 'react';
import { Navbar, Container, Nav, Offcanvas, Form, FormControl, Button } from 'react-bootstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newSearch = {
      value: this.state.value
    };
    this.props.onSubmit(newSearch);
    this.setState({ value: '' });
  }

  render() {
    const value = this.state.value;
    return (
      <Navbar className="righteous cornflower" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Concert Connection</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <a href="#">Home</a>
                <a href="#">Saved Concerts</a>
              </Nav>
              <Form className="d-flex" onSubmit={this.handleSubmit}>
                <FormControl
                  type="text"
                  value={value}
                  placeholder="Search by venue or artist..."
                  className="me-2"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
                <Button type="submit" variant="outline-success">Search</Button>
              </Form>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <a href="https://github.com/gregg-garceau">GitHub</a>
                <a href="https://www.linkedin.com/in/ggarceau/">LinkedIn</a>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
