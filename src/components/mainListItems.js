import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build'

export default (
	<div>
		<ListItem button>
			<ListItemIcon>
				<BuildIcon />
			</ListItemIcon>
			<ListItemText primary="Test item" />
		</ListItem>
	</div>
);