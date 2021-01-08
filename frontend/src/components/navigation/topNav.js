import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './topNav.css';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

import { login, logout } from '../../actions/auth';

const TopNav = (props) => {
	const signout = () => {
		props.logout();
	};

	return (
		<ul className="header-actions ">
			<li className="dropdown">
				<a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
					<span className="user-name">{props.userName ? props.userName : 'User'}</span>
					<span className="avatar">
						{props.userName}
						<span className="status busy" />
					</span>
				</a>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userSettings">
					<div className="header-profile-actions">
						<div className="header-user-profile">
							<div className="header-user" />
							<h5>{props.userName}</h5>
							<h5>{props.userSurname}</h5>
						</div>

						<a className="logoutBtn" onClick={signout}>
							<i className="icon-log-out1" /> Sign Out
						</a>
					</div>
				</div>
			</li>
		</ul>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn        : state.auth.isSignedIn,
		currentUserId     : state.auth.userId,
		userName          : state.auth.userName,
		userSurname       : state.auth.userSurname,
		currentUserAvatar : state.auth.userAvatar
	};
};

export default connect(mapStateToProps, { login, logout })(TopNav);
