import React from 'react';
import { connect } from 'react-redux';
import { generateActionCreators } from '../redux/test';

const test = (props) => {
	let actionCreators = generateActionCreators();
	props.setNames({firstName: "NoweImie", lastName: "NoweNazwisko"});
	let fullName = props ? `${props.test.firstName} ${props.test.lastName}` : "";
	return (
		<div>
			{fullName}
		</div>
	);
};

const mapStateToProps = state => ({
	test: state.test
})
export default connect(mapStateToProps, {setNames: generateActionCreators().setNames})(test);