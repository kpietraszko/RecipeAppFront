import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddCircle';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
	appBar: {
		// position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		//zIndex: theme.zIndex.drawer + 1
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	}
});

class ResponsiveDrawer extends Component {
	state = {
		mobileOpen: false,
	};
	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
	};
	handleDrawerButtonClick = (path) => {
		this.setState({ mobileOpen: false });
		this.props.history.push(path);
	}
	render() {
		const { classes, theme } = this.props;
		const drawer = (
			<div>
				<div className={`${classes.toolbar} drawerToolbar`}><Typography variant="title">Aplikacja kulinarna</Typography></div>
				<Divider />
				<List>
					<div>
						<ListItem button onClick={() => this.handleDrawerButtonClick("/")}>
							<ListItemIcon>
								<RestaurantMenuIcon />
							</ListItemIcon>
							<ListItemText primary="Przepisy" />
						</ListItem>
						<ListItem button onClick={() => this.handleDrawerButtonClick("/addRecipe")}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Dodaj przepis" />
						</ListItem>
						<ListItem button onClick={() => this.handleDrawerButtonClick("/search")}>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary="Wyszukaj" />
						</ListItem>
					</div>
				</List>
			</div>
		);
		return (
			<React.Fragment>
				{/* {this.state.redirect && <Redirect to={this.state.redirect} />} */}
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap primary="Responsive drawer">
							{this.props.currentPageTitle}
						</Typography>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
			</React.Fragment>
		);
	}
}
ResponsiveDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	currentPageTitle: state.global.currentPageTitle
})

export default connect(mapStateToProps)
	(withRouter(
		(withStyles(styles, { withTheme: true })(ResponsiveDrawer))));