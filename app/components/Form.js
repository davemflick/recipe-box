import React from 'react';
import { react } from 'react-dom';


export default class Form extends React.Component {

	render () {
	
		return (
			<div className='formContainer'>
				<form>
					<p> Dish </p>
					<input type='text'/>
					<br />
					<p> Ingredients </p>
					<textarea name='ingredients'/>
					<br />
					<p> Instructions </p>
					<textarea name='instructions'/>
					<br />
					<input type='submit' value='Add' />
				</form>
			</div>
		)

	}

}
