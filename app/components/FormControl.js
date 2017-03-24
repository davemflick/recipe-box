import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form'



export default class FormControl extends React.Component {
		constructor(props){
			super(props);
			this.state = {
			formDisplay: false,
			displyForm : {display: 'none'},
			}
		this.handleClick = this.handleClick.bind(this);
		}

	handleClick () {
		if(this.state.formDisplay === false){
			this.setState({
				formDisplay: true,
				displyForm : {display: 'block'},
			})
		} else {
			this.setState({
				formDisplay: false,
				displyForm : {display: 'none'},
			})
		}
	}

	render(){
		return(
			<div>
				<button className='btn btn-default' onClick={this.handleClick} type='button'> Add Recipe</button>
					<div id="popUpContainer" className="popUp" style={this.state.displyForm}>
						<div className="popUpContent">
							<Form />
						</div>
					</div>
			</div>
		)
	}

}