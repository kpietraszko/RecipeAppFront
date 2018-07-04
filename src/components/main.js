import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import RecipeListing from './recipeListing';
import { Route, Switch, withRouter } from 'react-router-dom';
import Search from './search';
import AddRecipe from './addRecipe';

const styles = theme => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		overflow: "auto"
	},
});
class Main extends Component {
	render() {
		const { classes } = this.props;
		return (
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route exact path="/" component={RecipeListing} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/addRecipe" component={AddRecipe} />
				</Switch>
			</main>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Main);