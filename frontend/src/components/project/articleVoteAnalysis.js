import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { addVote } from '../../actions/votes';

// The purpose of the connect wrapper is to communicate with the provider in order to get the store

const ArticleVoteAnalysis = (props) => {
	const [ score, setScore ] = useState(0);
	const [ reason, setReason ] = useState('');
	const [ voted, setVoted ] = useState(false);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ voted ]
	);

	const onSubmit = () => {
		// props.addReview(formValues, props.articleId);

		setVoted(true);

		props.addVote(props.articleId, score, reason, props.projectId);
	};

	const renderRadioButton = ({ input, meta }) => {
		return (
			<div className="form-check form-check-inline">
				<input
					className="form-check-input"
					type="radio"
					name="inlineRadioOptions"
					id="inlineRadio2"
					value="1"
				/>
			</div>
		);
	};
	const checkIfVoted = () => {
		if (props.article.votes && props.article.votes.length > 0) {
			let reviewers = props.article.votes.map((vote) => {
				return vote.reviewer._id;
			});
			let currentUser = [ props.currentUserId ];
			let filtered = reviewers.filter((reviewer) => currentUser.includes(reviewer));

			if (filtered.length > 0) {
				setVoted(true);
				return 'Voted';
			} else {
				return 'Yet To Vote';
			}
		}
	};

	const countVotes = () => {
		if (props.article.votes && props.article.votes.length > 0) {
			let reviewers = props.article.votes.map((vote) => {
				return vote.reviewer._id;
			});

			return reviewers.length;
		}
	};

	return (
		<section className="task-list">
			<div className="task-block card">
				<div className="task-details">
					<p>
						<small>
							<strong>#Vote Count:</strong> {countVotes()}
						</small>
					</p>

					<p>
						<small>
							<strong>#Average Votes Score:</strong> {countVotes()}
						</small>
					</p>
				</div>
			</div>
		</section>
	);
};

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'Please enter a valid title';
	}
	if (!formValues.journal) {
		errors.journal = 'Please enter a valid journal name';
	}

	if (!formValues.refID) {
		errors.refID = 'Please enter a valid refID';
	}
	if (!formValues.url) {
		errors.url = 'Please enter a valid url';
	}
	if (!formValues.abstract) {
		errors.abstract = 'Please enter your abstract';
	}
	if (!formValues.threshold || formValues.threshold === '~Select Threshold~') {
		errors.threshold = 'Please choose a threshold';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'ArticleVote',
	validate : validate
})(ArticleVoteAnalysis);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { addVote })(formWrapped);
