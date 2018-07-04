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

import { mapDispatchToPropsIngredients } from '../redux/ingredients';

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
		this.props.setCurrentPageTitle("Dodawanie przepisu");

	}
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};
	handleAddChip = (chip) => {
		let ingredients = this.state.ingredients.slice();
		ingredients.push(chip);
		this.setState({ ingredients })
	}
	handleDeleteChip = (chip, index) => {
		let ingredients = this.state.ingredients.slice();
		ingredients = ingredients.filter(element => element != chip);
		this.setState({ ingredients })
	}
	handleChangeIngredientAmount = (index, amount) => {

	}
	handleChangeIngredientUnit = (i, e) => {
		let ingredientsUnits = this.state.ingredientsUnits.slice();
		ingredientsUnits[i] = e.target.value;
		this.setState({ ingredientsUnits })
	}
	onKeyPress(event) {
		if (event.which === 13 /* Enter */) {
			event.preventDefault();
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid container justify="center">
				<Grid item xs={12} md={11} lg={8}>
					<form className={classes.container} onKeyPress={this.onKeyPress}>
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
							fullWidth
							className={classes.textField}
							label="Czas przyrządzenia"
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
						/>
						{this.state.ingredients.map((ingredient, i) =>
							<React.Fragment key={i}>
								<Grid item xs={6}>
									<TextField
										fullWidth
										className={classes.textField}
										label={`Ilość składnika ${ingredient}`}
										value={this.state.timeToMake}
										onChange={this.handleChangeIngredientAmount('timeToMake')}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={4} classes={{ item: "ingredientAmountGridItem" }}>
									<FormControl required className={classes.formControl} fullWidth>
										<InputLabel>Jednostka składnika {ingredient}</InputLabel>
										<Select
											value={this.state.ingredientsUnits[i]}
											onChange={(e) => this.handleChangeIngredientUnit(i, e)}
										>
											{amountUnits.map((unit, i) =>
												<MenuItem key={i} value={i}>{unit}</MenuItem>
											)}
										</Select>
									</FormControl>
								</Grid>
							</React.Fragment>)}
						{/* TODO: walidacja (pewnie przez inputProps), dodawanie składników */}
						<Grid item xs={12} >
							<Button type="submit" variant="fab" color="primary" className={classes.button}>
								<AddIcon />
							</Button>
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