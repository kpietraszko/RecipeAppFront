import React from 'react';
import { connect } from 'react-redux';
import { actionsDescriptors } from '../redux/test';
import { generateActionCreators } from '../redux/generators';

class test extends React.Component {
	componentDidMount = () => {
		this.props.setNames({ firstName: "NoweImie", lastName: "NoweNazwisko" });
	}
	render() {
		let fullName = this.props.test ? `${this.props.test.firstName} ${this.props.test.lastName}` : "";
		return (
			<div>
				{fullName}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	test: state.test
});
const mapDispatchToPropsShort = {
	setNames: generateActionCreators(actionsDescriptors).setNames
}
export default connect(mapStateToProps, mapDispatchToPropsShort)(test);