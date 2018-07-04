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

class recipeListing extends Component {
	state = {
		expanded: {}
	}
	componentDidMount = () => {
		this.props.setRecipesAllThunk();
		this.props.setCurrentPageTitle("Przepisy");
	}
	componentDidUpdate = (prevProps) => {
		if (prevProps.recipes != this.props.recipes) {
			let expanded = {};
			for (let recipe of this.props.recipes) {
				expanded[recipe.id] = false;
			}
			this.setState({ expanded });
		}
	}
	handleExpandClick = (id) => {
		this.setState({ expanded: { ...this.state.expanded, [id]: !this.state.expanded[id] } })
	}
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						Filtry
				</Grid>
					{this.props.recipes && this.props.recipes.map(recipe =>
						<Grow key={recipe.id} in>
							<Grid item xs={12} md={6} lg={4} key={recipe.id}>
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
													<ListItem key={ingredient.id} dense>
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
									</Collapse>
								</Card>
							</Grid>
						</Grow>
					)}
				</Grid>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => ({
	recipes: state.recipes.recipes
});

export default connect(mapStateToProps, {...mapDispatchToPropsGlobal(), ...mapDispatchToPropsRecipes()})
	(withStyles(null, { withTheme: true })(recipeListing));