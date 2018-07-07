import React, { Component } from 'react';
import { Typography, Grid, TextField, FormLabel, Button, Tooltip } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@material-ui/icons/Star';
import DifficultyIcon from '@material-ui/icons/Build';
import FilterIcon from '@material-ui/icons/FilterList';

{/* jakość, trudność, czas przygotowania */ }
class filters extends Component {
	state = {
		qualityHighlighted: 0,
		difficultyHighlighted: 0,
		chosenQuality: 0,
		chosenDifficulty: 0,
		maxTimeToMake: ""
	}
	handleQualityHover = (value) => {
		this.setState({ qualityHighlighted: value });
	}
	handleDifficultyHover = (value) => {
		this.setState({ difficultyHighlighted: value });
	}
	handleQualityClick = (value) => {
		this.setState({ chosenQuality: value });
	}
	handleDifficultyClick = (value) => {
		this.setState({ chosenDifficulty: value });
	}
	handleFilter = () => {

	}
	clear = () => {
		this.setState({ chosenQuality: 0, chosenDifficulty: 0, qualityHighlighted: 0, difficultyHighlighted: 0 });
	}
	render() {
		return (
			<Grid container justify="flex-start" alignItems="center" /* xs={12} md={12} lg={9} */ spacing={24} style={{marginLeft: "5px"}}>
				<Typography variant="subheading">Filtry: </Typography>
				<Button variant="flat" size="small" color="primary" style={{ marginLeft: "20px"}} onClick={this.clear}>Wyczyść</Button>
				<Grid item container alignItems="center" direction="column" style={{ width: "160px", margin: "5px" }}>
					<FormLabel>Min. ocena jakości</FormLabel>
					<StarRatingComponent
						name={`${this.props.ratingType}${this.props.recipeId}`}
						value={this.state.qualityHighlighted}
						onStarClick={this.handleQualityClick}
						onStarHover={this.handleQualityHover}
						onStarHoverOut={() => this.setState({ qualityHighlighted: this.state.chosenQuality })}
						renderStarIcon={() => <StarIcon />}
						starColor={"#FE9801"}
						emptyStarColor="#bfbfbf"
						editing={true}
					/>
				</Grid>
				<Grid item container alignItems="center" direction="column" style={{ width: "190px", margin: "5px" }}>
					<FormLabel>Maks. ocena trudności</FormLabel>
					<StarRatingComponent
						name={`${this.props.ratingType}${this.props.recipeId}`}
						value={this.state.difficultyHighlighted}
						onStarClick={this.handleDifficultyClick}
						onStarHover={this.handleDifficultyHover}
						onStarHoverOut={() => this.setState({ difficultyHighlighted: this.state.chosenDifficulty })}
						renderStarIcon={() => <DifficultyIcon />}
						starColor={"rgba(0, 0, 0, 0.87)"}
						emptyStarColor="#bfbfbf"
						editing={true}
					/>
				</Grid>
				<Grid item style={{ marginRight: "15px", width: "215px" }}>
					<TextField
						type="number"
						fullWidth
						label="Maks. czas przygotowania"
						helperText="w minutach"
						value={this.state.maxTimeToMake}
						onChange={e => this.setState({ maxTimeToMake: e.target.value })}
					/>
				</Grid>
				{/* <Grid item xs> */}
					<Tooltip title="Filtruj" placement="top">
						<Button variant="fab" mini color="primary" onClick={this.handleFilter}><FilterIcon /></Button>
					</Tooltip>
				{/* </Grid> */}
			</Grid >
		);
	}
}

export default filters;