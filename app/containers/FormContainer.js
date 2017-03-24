import React from 'react';
import { react } from 'react-dom';
import DishWell from '../components/DishWell';
import routes from '../config/routes';
import { Router, Route, Link, hashHistory } from 'react-router';
import Form from '../components/Form'






export default class FormContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				Dish: '',
				Ingredients: '',
				Instructions: ''
		};

		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.handleChangeDish = this.handleChangeDish.bind(this);
		this.handleChangeIngred = this.handleChangeIngred.bind(this);
		this.handleChangeInstruc = this.handleChangeInstruc.bind(this);
	}

	handleChangeDish (e) {
		e.preventDefault();
		this.setState({
					Dish: e.target.value
				})
	}

	handleChangeIngred (e) {
		e.preventDefault();
		this.setState ({
					Ingredients: e.target.value
				})
	}

	handleChangeInstruc (e) {
		e.preventDefault();
		this.setState ({
					Instructions: e.target.value
				})

	}

	handleSubmitForm (e) {
		e.preventDefault();
		console.log('fuck')
	}

	render () {
		return (
			<div>
			<Form inputRecipe={this.state}
				  onChangeDish={this.handleChangeDish}
				  onChangeIngred={this.handleChangeIngred}
				  onChangeInstruc={this.handleChangeInstruc}
				  onSubmitForm={this.handleSubmitForm}/>
			</div>
		)
	}

}


















