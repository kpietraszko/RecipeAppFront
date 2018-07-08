import React, { Component } from 'react';
import { mapDispatchToPropsGlobal } from '../redux/global';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ConfirmIcon from '@material-ui/icons/Done';
import { Redirect } from 'react-router-dom';
import { mapDispatchToPropsRecipes } from '../redux/recipes';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "80%",
	}
});
class Search extends Component {
	state = {
		name: "",
		description: "",
		timeToMake: "",
		ingredients: []
	}
	componentDidMount = () => {
		this.props.setCurrentPageTitle("Wyszukiwarka");
	}
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};
	handleAddChip = (chip) => {
		let ingredients = this.state.ingredients.slice();
		ingredients.push(chip);
		this.setState({ ingredients });
	}
	handleDeleteChip = (chip, index) => {
		let ingredients = this.state.ingredients.slice().filter(element => element != chip);
		this.setState({ ingredients });
		let ingredientsAmounts = this.state.ingredientsAmounts.slice();
		ingredientsAmounts.splice(index, 1);
		this.setState({ ingredientsAmounts });
		let ingredientsUnits = this.state.ingredientsUnits.slice();
		ingredientsUnits.splice(index, 1);
		this.setState({ ingredientsUnits });
	}
	onKeyPress(event) {
		if (event.which === 13 /* Enter */) {
			event.preventDefault();
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		let searchObject = {}
		if (this.state.name)
			searchObject.recipeName = this.state.name;
		if (this.state.description)
			searchObject.description = this.state.description;
		if (this.state.timeToMake)
			searchObject.maxTimeToMake = this.state.timeToMake;
		if (this.state.ingredients.length > 0)
			searchObject.ingredients = this.state.ingredients;
		axios.post("/recipe/search", searchObject)
			.then(response => {
				this.props.setRecipesAll(response.data);
				this.setState({ redirectTo: "/searchResults" });
			})
	}
	render() {
		const { classes } = this.props;
		return (
			<Grow in>
				<Grid container justify="center">
					{this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
					<Grid item xs={12} md={11} lg={8}>
						<form className={classes.container} onKeyPress={this.onKeyPress} onSubmit={e => { this.handleSubmit(e) }}>
							<TextField
								fullWidth
								className={classes.textField}
								label="Nazwa przepisu"
								value={this.state.name}
								onChange={this.handleChange('name')}
								margin="normal"
							/>
							<TextField
								type="number"
								fullWidth
								className={classes.textField}
								label="Maksymalny czas przygotowania"
								helperText="w minutach"
								value={this.state.timeToMake}
								onChange={this.handleChange('timeToMake')}
								margin="normal"
							/>
							<ChipInput
								fullWidth
								value={this.state.ingredients}
								onAdd={(chip) => this.handleAddChip(chip)}
								onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
								label="Wpisz składniki"
								helperText="Potwierdź każdy klawiszem enter"
								className={classes.textField}
								classes={{ root: "chipInput" }}
								name="ingredientsNames"
							/>
							<Typography variant="caption" style={{ marginBottom: "20px" }}>Znajdzie przepisy zawierające wszystkie podane składniki.</Typography>
							<Grid item xs={12} >
								<Button type="submit" variant="fab" color="primary" className={classes.button}>
									<ConfirmIcon />
								</Button>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Grow>
		);
	}
}

export default connect(null, { ...mapDispatchToPropsGlobal(), ...mapDispatchToPropsRecipes() })
	(withStyles(styles, { withTheme: true })(Search));