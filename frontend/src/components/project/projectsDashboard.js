import React, { Component, useState, useEffect } from 'react';
import selectLoads from '../../selectors/loads';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';

import { getProjects } from '../../actions/projects';
import { addProject } from '../../actions/projects';
import ProjectForm from './projectForm';
import LoadListSpinner from '../spinners/loadListSpinner';
import ProjectListItem from './projectListItem';
import './projectsDashboard.css';

const ProjectsDashboard = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ error, setError ] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getProjects();
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};
	const onSubmit = (formValues, csv) => {
		setIsOpen(false);
		props.addProject(formValues, csv);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const renderCreateLoad = () => {
		if (props.isSignedIn) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Post A New Load
						</button>
					</div>
				</div>
			);
		}
	};
	const queryString = () => {
		let values = queryString.parse(props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'current';
		}
		return values.status;
	};
	const capitalise = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<React.Fragment>
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Assigned Projects</li>
				</ol>
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Create A New Project
						</button>
					</div>
				</div>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					{props.projects[0] === 'Error' ? (
						<div>Error: Please check your network connection and refresh the page</div>
					) : props.projects[0] === true ? (
						<React.Fragment>
							<LoadListSpinner />
						</React.Fragment>
					) : (
						props.projects.map((project) => <ProjectListItem key={project._id} project={project} />)
					)}
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ProjectForm onSubmit={onSubmit} />
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		projects   : _.toArray(state.projects),
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { getProjects, addProject })(ProjectsDashboard);
