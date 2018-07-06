import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

class RecipeRating extends React.Component {
	state = {
		averageRating: 3, //ustawic na ocene z backendu,
		highlightedStar: 0,
		snackbarOpen: false
	}
	componentDidMount = () => {
		this.getRating();
	}
	getRating = () => {
		axios.get(`/recipe/${this.props.recipeId}/${this.props.ratingType}Rating`)
			.then(response => {
				this.setState({ averageRating: response.data });
				this.setState({ highlightedStar: response.data }); //moze lekko zbugowac podswietlanie na hoverze jesli odpowiedz przyjdzie pozniej
			});
	}
	handleStarClick = (value) => {
		axios.post(`/recipe/${this.props.recipeId}/${this.props.ratingType}Rating`, null,
			{ params: { rating: value } })
			.then(() => {
				this.getRating();
				this.props.onRatingAdded();
			});
	}
	handleStarHover = (hoveredStar) => {
		this.setState({ highlightedStar: hoveredStar });
	}
	handleSnackbarClose = (e, reason) => {
		if (reason !== "clickaway")
			this.setState({ snackbarOpen: false });
	}
	render = () => {
		return (
			<div className="ratingContainer">
				<StarRatingComponent
					name={`${this.props.ratingType}${this.props.recipeId}`} /* name of the radio input, it is required */
					value={this.state.highlightedStar} /* number of selected icon (`0` - none, `1` - first) */
					onStarClick={this.handleStarClick} /* on icon click handler */
					onStarHover={this.handleStarHover} /* on icon hover handler */
					onStarHoverOut={() => this.setState({ highlightedStar: this.state.averageRating })} /* on icon hover out handler */
					renderStarIcon={() => this.props.icon} /* it should return string or react component */
					starColor={this.props.ratingType === "quality" ? "#FE9801" : "rgba(0, 0, 0, 0.87)"} /* color of selected icons, default `#ffb400` */
					emptyStarColor="#bfbfbf"
					editing={true} /* is component available for editing, default `true` */
				/>
			</div>
		);
	}
};

export default RecipeRating;