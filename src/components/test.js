import React from 'react';
import { connect } from 'react-redux';
import { actionsDescriptors, thunksDescriptors } from '../redux/test';
import { generateMapDispatchToProps } from '../redux/generators';

class test extends React.Component {
	componentDidMount = () => {
		this.props.setNames({ firstName: "NoweImie", lastName: "NoweNazwisko" }); //dziala
		this.props.setAge({ age: 77 }); //dziala
		this.props.setStuff({ stuff: ["lorem", "ipsum", "i", "costam"] }); //dziala
		this.props.setAddressThunk(7); //dziala
	}
	render() {
		let fullName = this.props.test ? `${this.props.test.firstName} ${this.props.test.lastName}` : "";
		return (
			<div>
				{fullName} {this.props.test.age}
				{this.props.test.stuff && this.props.test.stuff.map((thing, i) =>
					<div key={i}>{thing}</div>)}
				{this.props.test && `${this.props.test.street} ${this.props.test.number}`}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	test: state.test
});

export default connect(mapStateToProps, generateMapDispatchToProps(actionsDescriptors, thunksDescriptors))(test);