import React from 'react';
import { react } from 'react-dom';


function insertIngr(ingredients) {
	return ingredients.map((item, index) => (<div key={'ing ' + (index + 1)}> {item} </div>))
}

export default class RecipeItem extends React.Component {

	render () {
		return (
			<div className='well' >
			 <h3 className='dishName'>{this.props.title}</h3>
			 <span className='expand' onClick={this.props.onDisplayChange}>⬇︎⬆︎⬇︎⬆︎⬇</span>
			 	<div className="ingredients" style={this.props.display}>
			 		{ insertIngr(this.props.ingr) } 
				</div>
			 	<button className='btn editBtn' style={this.props.display} onClick={this.props.edit}> Edit </button>
				<button className='btn deleteBtn' style={this.props.display} onClick={this.props.delete}> Delete </button>
			</div>
		)
	};

} //End of class RecipeItem

RecipeItem.propTypes = {
	title: React.PropTypes.string.isRequired,
	ingr: React.PropTypes.array.isRequired,
	onDisplayChange: React.PropTypes.func.isRequired,
};


