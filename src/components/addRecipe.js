import React, { Component } from 'react';
import { mapDispatchToPropsGlobal } from '../redux/global';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import amountUnits from '../constants/ingredientAmountUnits';
import axios from 'axios';
import ConfirmIcon from '@material-ui/icons/Done';

import { mapDispatchToPropsIngredients } from '../redux/ingredients';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "75%",
	}
});
class AddRecipe extends Component {
	state = {
		name: "",
		description: "",
		timeToMake: "",
		ingredients: [],
		ingredientsAmounts: [],
		ingredientsUnits: []
	}
	componentDidMount = () => {
		let title = "Dodawanie przepisu";
		if (this.props.match.path === "/editRecipe/:id") {
			this.setState({ editing: this.props.match.params.id })
			title = "Edycja przepisu";
			axios.get(`/recipe/${this.props.match.params.id}`)
				.then(response => {
					const recipe = response.data;
					this.setState({
						name: recipe.name,
						description: recipe.description,
						timeToMake: !recipe.timeToMake ? "" : recipe.timeToMake,
						ingredients: recipe.ingredients.map(i => i.name),
						ingredientsAmounts: recipe.ingredients.map(i => i.amount),
						ingredientsUnits: recipe.ingredients.map(i => i.amountUnit)
					});
				})
		}
		this.props.setCurrentPageTitle(title);
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
		let ingredientsAmounts = this.state.ingredientsAmounts.slice();
		ingredientsAmounts.push("");
		this.setState({ ingredientsAmounts });
		let ingredientsUnits = this.state.ingredientsUnits.slice();
		ingredientsUnits.push(0);
		this.setState({ ingredientsUnits });
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
	handleChangeIngredientAmount = (i, e) => {
		let ingredientsAmounts = this.state.ingredientsAmounts.slice();
		ingredientsAmounts[i] = e.target.value;
		this.setState({ ingredientsAmounts });
	}
	handleChangeIngredientUnit = (i, e) => {
		let ingredientsUnits = this.state.ingredientsUnits.slice();
		ingredientsUnits[i] = e.target.value;
		this.setState({ ingredientsUnits });
	}
	onKeyPress(event) {
		if (event.which === 13 /* Enter */) {
			event.preventDefault();
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		e.target.ingredientsNames.setCustomValidity(this.state.ingredients.length > 0 ? '' : 'Wprowadź przynajmniej 1 składnik');
		let recipeObject = {};
		recipeObject.name = this.state.name;
		recipeObject.description = this.state.description;
		if (this.state.timeToMake)
			recipeObject.timeToMake = this.state.timeToMake;
		recipeObject.ingredients = [];
		for (let i = 0; i < this.state.ingredients.length; i++) {
			recipeObject.ingredients[i] = {
				name: this.state.ingredients[i],
				amount: this.state.ingredientsAmounts[i],
				amountUnit: this.state.ingredientsUnits[i]
			}
		}
		if (!this.state.editing) {
			axios.post("/recipe", recipeObject)
				.then(() => { this.setState({ redirectTo: "/notify/addedRecipe" }) })
				.catch(error => console.log(error));
			return;
		}
		axios.put(`/recipe/${this.state.editing}`, recipeObject)
			.then(() => { this.setState({ redirectTo: "/notify/editedRecipe" }) })
	}

	render() {
		const { classes } = this.props;
		return (
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
							required
						/>
						<TextField
							fullWidth
							className={classes.textField}
							label="Sposób przyrządzenia"
							multiline
							rows="4"
							rowsMax="15"
							value={this.state.description}
							onChange={this.handleChange('description')}
							margin="normal"
							required
						/>
						<TextField
							type="number"
							fullWidth
							className={classes.textField}
							label="Czas przygotowania"
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
						{this.state.ingredients.map((ingredient, i) =>
							<React.Fragment key={i}>
								<Grid item xs={6}>
									<TextField
										type="number"
										required
										fullWidth
										className={classes.textField}
										label={`Ilość składnika ${ingredient}`}
										value={this.state.ingredientsAmounts[i]}
										onChange={(e) => this.handleChangeIngredientAmount(i, e)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={4} classes={{ item: "ingredientAmountGridItem" }}>
									<FormControl required className={classes.formControl} fullWidth>
										<InputLabel>Jednostka składnika {ingredient}</InputLabel>
										<Select
											value={this.state.ingredientsUnits[i]}
											onChange={(e) => this.handleChangeIngredientUnit(i, e)}
											inputProps={{
												name: `unit${i}`,
												id: `unit${i}`
											}}
										>
											{amountUnits.map((unit, i) =>
												<MenuItem key={i} value={i}>{unit}</MenuItem>
											)}
										</Select>
									</FormControl>
								</Grid>
							</React.Fragment>)}
						<Grid item xs={12} >
							{this.state.editing ?
								<Button type="submit" variant="fab" color="primary" className={classes.button}>
									<ConfirmIcon />
								</Button> :
								<Button type="submit" variant="fab" color="primary" className={classes.button}>
									<AddIcon />
								</Button>}
						</Grid>
					</form>
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = state => ({
	allIngredients: state.ingredients.allIngredients
})

export default connect(mapStateToProps, { ...mapDispatchToPropsGlobal(), ...mapDispatchToPropsIngredients() })
	(withStyles(styles, { withTheme: true })(AddRecipe));