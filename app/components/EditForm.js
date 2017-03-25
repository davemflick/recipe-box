import React from 'react';
import { react } from 'react-dom';

export default class EditForm extends React.Component {
	

	render () {
		return (
			<div className='formContainer'>
				<form onSubmit={this.props.onSubmitEdit}>
					<p> Dish </p>
					<input type='text' value={this.props.editName} onChange={this.props.onNameEdit}/>
					<br />
					<p> Ingredients </p>
					<textarea name='ingredients' value={this.props.editIng} onChange={this.props.onIngEdit}/>
					<br />
					<input id='addEdit' type='submit' value='Save' />
					<input id='editCancel' type='button' value='Cancel' onClick={this.props.closeEdit} />
				</form>
			</div>
		)

	}

}