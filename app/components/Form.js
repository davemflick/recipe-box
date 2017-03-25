import React from 'react';
import { react } from 'react-dom';


export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			ingredients: '',
		}
	}

	onNameChange (e) {
		this.state.name = e.target.value;
		this.setState(this.state);
	}
	onIngChange (e) {
		this.state.ingredients = e.target.value;
		this.setState(this.state);
	}


	onSubmit (e) {
		e.preventDefault();
		this.props.onAdd(this.state.name, this.state.ingredients);
		this.setState({
			name: '',
			ingredients: '',
		})
		}

	render () {
	
		return (
			<div className='formContainer'>
				<form onSubmit={this.onSubmit.bind(this)}>
					<p> Dish </p>
					<input type='text' value={this.state.name} onChange={this.onNameChange.bind(this)}/>
					<br />
					<p> Ingredients </p>
					<textarea name='ingredients' value={this.state.ingredients} onChange={this.onIngChange.bind(this)}/>
					<br />
					<input id='formAdd' type='submit' value='Add' />
					<input id='formCancel' type='button' value='Cancel' onClick={ () =>{ this.props.closePopUpForm()} } />
				</form>
			</div>
		)

	}

}

Form.propTypes = {
	onAdd: React.PropTypes.func.isRequired,
}
