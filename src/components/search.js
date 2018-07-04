import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { mapDispatchToPropsGlobal } from '../redux/global';
import { connect } from 'react-redux';


class Search extends Component {
	componentDidMount = () => {
		this.props.setCurrentPageTitle("Wyszukiwarka");
	}
	render() {
		return (
			<Typography>
				Search page
			</Typography>
		);
	}
}

export default connect(null, mapDispatchToPropsGlobal())(Search);