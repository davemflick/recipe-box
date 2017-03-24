import React from 'react';
import { react } from 'react-dom';


export default class RecipeItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		recipes: [
			{
				title: "Hamburger",
				ingredients: ["Buns", "Beef", "Ketchup"],
				shown: false,
				display: { display: 'none' },
			},
			{
				title: "Pizza",
				ingredients: ["Dough", "Sauce", "Cheese", "Pepperoni"],
				shown: false,
				display: { display: 'none' },
			},
			{
				title: "Cereal",
				ingredients: ["Cereal", "Milk"],
				shown: false,
				display: { display: 'none' },
			},

			],

		}

		this.handleClick = this.handleClick.bind(this)
		
	}

	handleClick() {
		
	}

	render () {
		let recipeList = this.state.recipes;
		return (
		<div className='recipeList'>
			{recipeList.map( (recipe) => {
				return(
				<div className='well dish' onClick={this.handleClick} key={recipeList.indexOf(recipe)}>
				 <h3 className='dishName'> {recipe.title}</h3>
					 <div className='ingredients' style={this.state.display}>
						{recipe.ingredients.map( (item) => {
							return <div key={recipe.ingredients.indexOf(item)}> {item} </div>;
						})}
					 </div>
					 <button className='btn btn-primary' style={this.state.display}> Edit </button>
					 <button className='btn btn-danger' style={this.state.display}> Delete </button>
				</div>)
				})}
		</div>
		)
	}
}


// handleClick() {
// 		if(this.state.shown === false) {
// 			this.setState({
// 				shown: true,
// 				display: { display: '' },
// 			})

// 		} else {
// 			this.setState({
// 				shown: false,
// 				display: { display: 'none' },
// 			})
			
// 		}
// 	}















