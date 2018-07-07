import React, { Component } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';

{/* jakość, trudność, czas przygotowania */ }
class filters extends Component {
	render() {
		return (
			<Grid container justify="space-around">
				<Typography variant="subheading">Filtry: </Typography>
				<form>
					<TextField 
						label="Min. ocena jakości"/>
				</form>
			</Grid>
		);
	}
}

export default filters;