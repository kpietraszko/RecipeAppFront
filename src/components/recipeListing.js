import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { generateMapDispatchToProps } from '../redux/generators';
import { CardHeader, Grow, CardActions, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import classnames from 'classnames';
import amountUnits from '../constants/ingredientAmountUnits';
import { mapDispatchToPropsGlobal } from '../redux/global';
import { mapDispatchToPropsRecipes } from '../redux/recipes';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { Redirect } from 'react-router';

class recipeListing extends Component {
	state = {
		expanded: {}
	}
	componentDidMount = () => {

		let title = "Przepisy";
		if (this.props.match.path === "/searchResults") {
			title = "Wyniki wyszukiwania"
		}
		else {
			this.props.setRecipesAllThunk(); //jeśli strona główna to pobiera wszystkie przepisy
		}
		this.props.setCurrentPageTitle(title);
		if (this.props.match.params.notification === "addedRecipe")
			this.setState({ snackbar: "Dodano przepis" });

		if (this.props.match.params.notification === "editedRecipe")
			this.setState({ snackbar: "Zmieniono przepis" });
	}
	componentDidUpdate = (prevProps) => {
		if (prevProps.recipes != this.props.recipes) {
			let expanded = {};
			for (let recipe of this.props.recipes) {
				expanded[recipe.id] = false;
			}
			this.setState({ expanded });
		}
		if (prevProps.match.path === "/searchResults" && this.props.match.path === "/") {
			this.props.setCurrentPageTitle("Przepisy");
			this.props.setRecipesAllThunk();
		}
	}
	handleExpandClick = (id) => {
		this.setState({ expanded: { ...this.state.expanded, [id]: !this.state.expanded[id] } })
	}
	handleClose = () => {
		this.setState({ snackbar: false });
	}
	handleDelete = (id) => {
		axios.delete(`/recipe/${id}`)
			.then(response => {
				this.props.setRecipesAllThunk();
				this.setState({ snackbar: "Usunięto przepis" });
			})
			.catch(error => console.log(error));
	}
	handleEditClick = (recipe) => {
		this.setState({ redirectTo: `/editRecipe/${recipe}` })
	}
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				{this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={this.state.snackbar}
					autoHideDuration={3000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{this.state.snackbar}</span>} />
				<Grid container spacing={24}>
					<Grid item xs={12}>
						Filtry
				</Grid>
					{this.props.recipes && this.props.recipes.map(recipe =>
						<Grow key={recipe.id} in>
							<Grid item xs={12} sm={6} md={6} lg={4} key={recipe.id}>
								<Card>
									<CardHeader
										title={recipe.name}
										subheader={`Czas przygotowania: ${recipe.timeToMake} min`}
										action={
											<IconButton
												className={classnames(classes.expand, {
													[classes.expandOpen]: this.state.expanded[recipe.id],
												})}
												onClick={() => this.handleExpandClick(recipe.id)}
												aria-expanded={this.state.expanded}
												aria-label="Show more"
											>
												{this.state.expanded[recipe.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
											</IconButton>
										} />
									<Collapse in={this.state.expanded[`${recipe.id}`]}> {/*{this.state.expanded[recipe.id]}> */}
										<CardContent classes={{ root: "recipeCardContent" }}>
											<Typography variant="subheading">
												Składniki
										</Typography>
											<List dense disablePadding>
												{recipe.ingredients.map(ingredient =>
													<ListItem key={`${recipe.id}:${ingredient.name}`} dense>
														<ListItemText
															primary={ingredient.name}
															secondary={`${ingredient.amount} ${amountUnits[ingredient.amountUnit]}`} />
													</ListItem>
												)}
											</List>
											<Typography variant="subheading" gutterBottom>
												Sposób przygotowania
										</Typography>
											<Typography>
												{recipe.description}
											</Typography>
										</CardContent>
										<CardActions>
											<Grid container justify="space-between">
												<Button size="small" color="primary" onClick={() => this.handleEditClick(recipe.id)}>
													Edytuj
         										</Button>
												<Button color="secondary" className={classes.button} onClick={() => this.handleDelete(recipe.id)}>
													Usuń
        											<DeleteIcon className={classes.rightIcon} />
												</Button>
											</Grid>
										</CardActions>
									</Collapse>
								</Card>
							</Grid>
						</Grow>
					)}
				</Grid>
			</React.Fragment >
		);
	}
}
const mapStateToProps = state => ({
	recipes: state.recipes.recipes
});

export default connect(mapStateToProps, { ...mapDispatchToPropsGlobal(), ...mapDispatchToPropsRecipes() })
	(withStyles(null, { withTheme: true })(recipeListing));