import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import './nav.css';

import React, { Component } from 'react';
import Logo from './logo.png';

export default class nav extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Brand href="#home">
						<img id='logo' src={Logo} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto " />
						<Nav>
							<NavDropdown title="Assigned Projects" id="collasible-nav-dropdown">
								<Nav.Link as={Link} className="dropdown-item" to="/projects" href="/projects">
									Active Projects
								</Nav.Link>
								<NavDropdown.Divider />
								<Nav.Link as={Link} className="dropdown-item" to="/projects" href="/projects">
									Archived Projects
								</Nav.Link>
							</NavDropdown>

							<NavDropdown title="My Projects" id="collasible-nav-dropdown">
								<Nav.Link as={Link} className="dropdown-item" to="/myprojects" href="/myprojects">
									Active Projects
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/myprojects" href="/mprojects">
									Archived Projects
								</Nav.Link>
								<NavDropdown.Divider />
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</React.Fragment>
		);
	}
}
