import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form'



export default class FormControl extends React.Component {
		constructor(props){
			super(props);
			this.state = {
			formDisplay: false,
			displayForm : {display: 'none'},
			}
		this.handleClick = this.handleClick.bind(this);
		this.closePopUpForm = this.closePopUpForm.bind(this);
		this.onAdd = this.onAdd.bind(this);
		}

	handleClick () {
		if(this.state.formDisplay === false){
			this.setState({
				formDisplay: true,
				displayForm : {display: 'block'},
			})
		} else {
			this.setState({
				formDisplay: false,
				displayForm : {display: 'none'},
			})
		}
	}

	closePopUpForm () {
		if(this.state.formDisplay === true) {
			this.setState({
				formDisplay: false,
				displayForm : {display: 'none'},
			})
		}
	}

	onAdd (delta, chi, dog) {
		this.state.name = delta;
		this.state.ingredients = chi;
		this.state.instructions = dog;
		this.props.onAddRecipe(delta, chi, dog);
		this.closePopUpForm();
	}


	render(){
		return(
			<div>
				<button className='btn addRecipe' onClick={this.handleClick} type='button'> Add Recipe</button>
					<div id="popUpContainer" className="popUp" style={this.state.displayForm}>
						<div className="popUpContent">
							<Form closePopUpForm={this.closePopUpForm} onAdd={this.onAdd}/>
						</div>
					</div>
			</div>
		)
	}

}

