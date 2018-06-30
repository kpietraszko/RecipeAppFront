import React from 'react';
import { connect } from 'react-redux';
import { actionsDescriptors } from '../redux/test';
import { generateMapDispatchToProps } from '../redux/generators';

class test extends React.Component {
	componentDidMount = () => {
		this.props.setNames({ firstName: "NoweImie", lastName: "NoweNazwisko" }); //dziala
		this.props.setAge({age: 77}); //dziala
		this.props.setStuff({stuff: ["lorem", "ipsum", "i", "costam", "jeszcze"]}); //dziala
	}
	render() {
		let fullName = this.props.test ? `${this.props.test.firstName} ${this.props.test.lastName}` : "";
		return (
			<div>
				{fullName} {this.props.test.age}
				{this.props.test.stuff && this.props.test.stuff.map((thing,i) => 
				<div key={i}>{thing}</div>)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	test: state.test
});

export default connect(mapStateToProps, generateMapDispatchToProps(actionsDescriptors))(test);