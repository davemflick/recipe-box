import React from 'react';
import ReactDOM, { react } from 'react-dom';
import Header from './components/Header'

let RECIPES = [
		{
			name: "Hamburger",
			ingredients: ["Buns", "Beef", "Ketchup"],
			shown: false,
			display : 'none',
		},
		{
			name: "Pizza",
			ingredients: ["Dough", "Sauce", "Cheese", "Pepperoni", 'adfds', 'sdfasd', 'asdf'],
			shown: false,
			display : 'none',
		},
		{
			name: "Cereal",
			ingredients: ["Cereal", "Milk"],
			shown: false,
			display : 'none',
		},

	];


// START OF FORM LAYOUT  ***********************************************************FORM LAYOUT

class Form extends React.Component {
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

// END OF FORM LAYOUT ***********************************************************FORM LAYOUT

// START OF ADD RECIPE  ***********************************************************ADD RECIPE

class FormControl extends React.Component {
		constructor(props){
			super(props);
			this.state = {
			formDisplay: false,
			displyForm : {display: 'none'},
			}
		this.handleClick = this.handleClick.bind(this);
		this.closePopUpForm = this.closePopUpForm.bind(this);
		this.onAdd = this.onAdd.bind(this);
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

	closePopUpForm () {
		if(this.state.formDisplay === true) {
			this.setState({
				formDisplay: false,
				displyForm : {display: 'none'},
			})
		}
	}

	onAdd (delta, chi) {
		this.state.name = delta;
		this.state.ingredients = chi;
		this.props.onAddRecipe(this.state.name, this.state.ingredients);
		this.closePopUpForm();
	}




	render(){
		return(
			<div>
				<button className='btn btn-default addRecipe' onClick={this.handleClick} type='button'> Add Recipe</button>
					<div id="popUpContainer" className="popUp" style={this.state.displyForm}>
						<div className="popUpContent">
							<Form closePopUpForm={this.closePopUpForm} onAdd={this.onAdd}/>
						</div>
					</div>
			</div>
		)
	}

}

// END OF ADD RECIPE ***********************************************************ADD RECIPE




// START OF RECIPE ITEM ***********************************************************RECIPE-ITEM

function insertIngr(ingredients) {
	return ingredients.map((item, index) => (<div key={'ing ' + (index + 1)}> {item} </div>))
}

class RecipeItem extends React.Component {

	render () {
		return (
			<div className='well dish' onClick={() =>{ this.props.onDisplayChange()}}>
			 <h3 className='dishName'>{this.props.title}</h3>
			 	<div className="ingredients" style={this.props.display}>
			 		{ insertIngr(this.props.ingr) } 
				</div>
			 	<button className='btn btn-primary' style={this.props.display}> Edit </button>
				<button className='btn btn-danger' style={this.props.display}> Delete </button>
			</div>
		)
	};

} //End of class RecipeItem

RecipeItem.propTypes = {
	title: React.PropTypes.string.isRequired,
	ingr: React.PropTypes.array.isRequired,
	onDisplayChange: React.PropTypes.func.isRequired,
};

// END OF RECIPE ITEM ***********************************************************RECIPE-ITEM

//THIS IS THE App OUTPUT*********************************************************MAIN


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: this.props.initialRecipes,
		}
		this.onDisplayChange = this.onDisplayChange.bind(this);
		this.onAddRecipe = this.onAddRecipe.bind(this);
	}

	onDisplayChange (index, delta) {
		if(this.state.recipes[index].display === 'none') {
			this.state.recipes[index].display = 'block';
		} else { this.state.recipes[index].display = 'none'}
		this.setState(this.state)
	}

	onAddRecipe (name, ing) {
		let ingred = ing.split(', ');
		this.state.recipes.push({
			name: name,
			ingredients: ingred,
			shown: false,
			display : 'none',
		})
		this.setState(this.state);

	}
	

	render () {
		
		return (
		<div className="mainContainer">
				<Header />
				<div className='recipeContainer' >
					<h3> Recipe List </h3>
					<FormControl onAddRecipe={this.onAddRecipe}/>
					<div className="recipeList">
						{this.state.recipes.map((recipe, index) =>{ 
							return (<RecipeItem 
							onDisplayChange={ (delta) => this.onDisplayChange(index, delta)}
							title={recipe.name} 
							ingr={recipe.ingredients}
							display={{display:recipe.display}}
							key={this.state.recipes.indexOf(recipe)}
							 />
							);
						})}
					</div>
				</div>
			</div>
		)
	}
}

App.PropTypes = {
	title: React.PropTypes.string,
	ingr: React.PropTypes.array.isRequired,
	onDisplayChange: React.PropTypes.func.isRequired,
	initialRecipes: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		ingredients: React.PropTypes.array.isRequired,
		key: React.PropTypes.number.isRequired,
		})).isRequired,
}

//END OF App OUTPUT*********************************************************MAIN


ReactDOM.render(<App initialRecipes={RECIPES} />, document.getElementById('app'));




// function insertIngr(ingredients) {
// 	return ingredients.map((item, index) => (<div key={'ing ' + (index + 1)}> {item} </div>))
// }

// class RecipeItem extends React.Component {
// 		constructor(props){
// 		super(props);
// 		this.state = {
// 		shown: false,
// 		display : 'none',
// 		}
// 	this.showHideDish = this.showHideDish.bind(this);
// 	}

// 	showHideDish (e) {
// 		e.preventDefault;
// 		let cur = this.state.shown;
// 		let none = {display: 'none'};
// 		if(cur === false) {
// 			this.setState({
// 				shown: true,
// 				display: 'block',
// 			})
// 		} else {
// 			this.setState({
// 				shown: false,
// 				display: 'none',
// 			})
// 		}
// 	}

// 	render () {
// 		return (
// 			<div className='well dish' onClick={this.showHideDish}>
// 			 <h3 className='dishName'>{this.props.title}</h3>
// 			 	<div className="ingredients" style={{display: this.state.display}}>
// 			 		{ insertIngr(this.props.ingr) } 
// 				</div>
// 			 	<button className='btn btn-primary' style={{display: this.state.display}}> Edit </button>
// 				<button className='btn btn-danger' style={{display: this.state.display}}> Delete </button>
// 			</div>
// 		)
// 	};

// } //End of class RecipeItem

// RecipeItem.propTypes = {
// 	title: React.PropTypes.string.isRequired,
// 	ingr: React.PropTypes.array.isRequired,
// 	onChange: React.PropTypes.func.isRequired,
// };





