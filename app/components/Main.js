import React from 'react';
import { react } from 'react-dom';
import Header from './Header'
import Form from './Form'

let RECIPES = [
		{
			name: "Hamburger",
			ingredients: ["Buns", "Beef", "Ketchup"],
			key: 0,
		},
		{
			name: "Pizza",
			ingredients: ["Dough", "Sauce", "Cheese", "Pepperoni"],
			key: 1,
		},
		{
			name: "Cereal",
			ingredients: ["Cereal", "Milk"],
			key: 2,
		},

	];

// class FormControl extends React.Component {
// 		constructor(props){
// 			super(props);
// 			this.state = {
// 			formDisplay: false,
// 			displyForm : {display: 'none'},
// 			}
// 		this.handleClick = this.handleClick.bind(this);
// 		}

// 	handleClick () {
// 		if(this.state.formDisplay === false){
// 			this.setState({
// 				formDisplay: true,
// 				displyForm : {display: 'block'},
// 			})
// 		} else {
// 			this.setState({
// 				formDisplay: false,
// 				displyForm : {display: 'none'},
// 			})
// 		}
// 	}

// 	render(){
// 		return(
// 			<div>
// 				<button className='btn btn-default' onClick={this.handleClick} type='button'> Add Recipe</button>
// 					<div id="popUpContainer" className="popUp" style={this.state.displyForm}>
// 						<div className="popUpContent">
// 							<Form />
// 						</div>
// 					</div>
// 			</div>
// 		)
// 	}

// }


function insertIngr(ingredients) {
	return ingredients.map((item, index) => (<div key={index}> {item} </div>))
}

class IngredientList extends React.Component{
	render () {
		return (
			<div className="ingredients">
			 	{ insertIngr(this.props.ingr) }
			</div>
		)
	}
}
IngredientList.propTypes = {
	ingr: React.PropTypes.array.isRequired,
};



class RecipeItem extends React.Component {
	render () {
		return (
			<div className='well dish'>
			 <h3 className='dishName'>{this.props.title}</h3>
			 	<IngredientList ingr={this.props.ingr} />
				<button className='btn btn-primary'> Edit </button>
				<button className='btn btn-danger'> Delete </button>
			</div>
		)
	};

} //End of class RecipeItem

RecipeItem.propTypes = {
	title: React.PropTypes.string.isRequired,
};

//THIS IS THE MAIN OUTPUT*********************************************************MAIN


export default class Main extends React.Component {


	render () {
		
		return (
		<div className="mainContainer">
				<Header />
				<div className='recipeContainer' >
					<h3> Recipe List </h3>
					<div className="recipeList">
						{RECIPES.map((recipe) =>{ return <RecipeItem 
							title={recipe.name} 
							ingr={recipe.ingredients} 
							key={recipe.key} />
						})}
					</div>
				</div>
			</div>
		)
	}
}

Main.PropTypes = {
	title: React.PropTypes.string,
	ingr: React.PropTypes.array.isRequired,
	recipes: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		ingredients: React.PropTypes.array.isRequired,
		key: React.PropTypes.number.isRequired,
		})).isRequired,
}

//END OF MAIN OUTPUT*********************************************************MAIN


















