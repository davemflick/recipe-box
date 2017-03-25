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
			ingredients: ["Dough", "Sauce", "Cheese", "Pepperoni"],
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
console.log(localStorage.length)
if(localStorage.length === 0 ){
	localStorage['RECIPES'] = JSON.stringify(RECIPES);
}

let STORED_RECIPES = JSON.parse(localStorage['RECIPES']);





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
					<div id="popUpContainer" className="popUp" style={this.state.displayForm}>
						<div className="popUpContent">
							<Form closePopUpForm={this.closePopUpForm} onAdd={this.onAdd}/>
						</div>
					</div>
			</div>
		)
	}

}

// END OF ADD RECIPE ***********************************************************ADD RECIPE


// START OF RECIPE EDIT ***********************************************************RECIPE EDIT
class EditForm extends React.Component {
	

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

class EditFormControl extends React.Component {

	render(){
		return(
			<div>
					<div id="popUpContainer" className="popUp" style={this.props.displayEditForm}>
						<div className="popUpContent">
							<EditForm 
							closeEdit={this.props.closeEdit}
							onSubmitEdit={this.props.onSubmitEdit}
							editName={this.props.editName}
							onNameEdit={this.props.onNameEdit}
							editIng={this.props.editIng}
							onIngEdit={this.props.onIngEdit}
							/>
						</div>
					</div>
			</div>
		)
	}

}
// END OF RECIPE EDIT ***********************************************************RECIPE EDIT




// START OF RECIPE ITEM ***********************************************************RECIPE-ITEM

function insertIngr(ingredients) {
	return ingredients.map((item, index) => (<div key={'ing ' + (index + 1)}> {item} </div>))
}

class RecipeItem extends React.Component {

	render () {
		return (
			<div className='well dish'>
			 <h3 className='dishName'>{this.props.title}</h3>
			 <span className='expand' onClick={this.props.onDisplayChange}>---Show/Hide---</span>
			 	<div className="ingredients" style={this.props.display}>
			 		{ insertIngr(this.props.ingr) } 
				</div>
			 	<button className='btn btn-primary' style={this.props.display} onClick={this.props.edit}> Edit </button>
				<button className='btn btn-danger' style={this.props.display} onClick={this.props.delete}> Delete </button>
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
			recipes: STORED_RECIPES,
			editDisplay: false,
			displayEdit : {display: 'none'},
			editName: '',
			editIng: '',
			editIndex: '',
		}
		this.onDisplayChange = this.onDisplayChange.bind(this);
		this.onAddRecipe = this.onAddRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
		this.onNameEdit = this.onNameEdit.bind(this);
		this.onIngEdit = this.onIngEdit.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);

	}
//EDITING A RECIPE
	editRecipe (e) {
		this.state.displayEdit = {display: 'block'};
		this.state.editName = e.target.parentNode.firstChild.textContent;
		for(var i in this.state.recipes){
			if(this.state.recipes[i].name === this.state.editName){
				this.state.editIng = this.state.recipes[i].ingredients.toString();
				this.state.editIndex = i;
			}
		}
		this.setState(this.state);
	}

	closeEdit () {
		this.setState({
			displayEdit: {display: 'none'},
			editName: '',
			editIng: '',
		});
	}

	onNameEdit (e) {
		this.state.editName = e.target.value;
		this.setState(this.state);
	}

	onIngEdit (e) {
		this.state.editIng = e.target.value;
		this.setState(this.state);
	}

	onSubmitEdit (e) {
		e.preventDefault();
		let editedRecipe = {
			name: this.state.editName,
			ingredients: this.state.editIng.split(','),
			shown: true,
			display : 'block',
		}
		this.state.recipes.splice(this.state.editIndex, 1, editedRecipe);
		this.setState({
			recipes: this.state.recipes,
			editName: '',
			editIng: '',
		})
		this.closeEdit();
		this.submitToLocal();
	}

	submitToLocal () {
		let recipe = this.state.recipes;
		for(var i in recipe) {
			if(recipe[i].shown === true && recipe[i].display === 'block'){
				recipe[i].shown = false;
				recipe[i].display = 'none';
			}
		}
		localStorage['RECIPES'] = JSON.stringify(this.state.recipes);
		let STORED_RECIPES = JSON.parse(localStorage['RECIPES']);

	}

	deleteRecipe (e) {
		let dishName = e.target.parentNode.firstChild.textContent
		for(var i in this.state.recipes) {
			let recipe = this.state.recipes[i]
			recipe.name === dishName ? this.state.recipes.splice(i, 1) : '';
			this.setState(this.state);
		}
		localStorage['RECIPES'] = JSON.stringify(this.state.recipes);
		let STORED_RECIPES = JSON.parse(localStorage['RECIPES']);
	}
//END EDITING A RECIPE
	onDisplayChange (delta) {
		let dishName = delta.target.previousSibling.textContent;
		let recipeList = this.state.recipes;
		for (var i in recipeList){
		if(dishName === recipeList[i].name && recipeList[i].display === 'none') {
			recipeList[i].display = 'block';
		} else { recipeList[i].display = 'none'}
		this.setState(this.state)
		}
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
		localStorage['RECIPES'] = JSON.stringify(this.state.recipes);
		let STORED_RECIPES = JSON.parse(localStorage['RECIPES']);
	}
	

	render () {
		
		return (
		<div className="mainContainer">
				<Header />
				<div className='recipeContainer' >
					<h3> Recipe List </h3>
					<FormControl onAddRecipe={this.onAddRecipe}/>
					<EditFormControl 
						displayEditForm={this.state.displayEdit}
						onSubmitEdit={this.onSubmitEdit} 
						closeEdit={this.closeEdit}
						editName={this.state.editName}
						onNameEdit={this.onNameEdit}
						editIng={this.state.editIng}
						onIngEdit={this.onIngEdit}
						/>

					<div className="recipeList">
						{this.state.recipes.map((recipe, index) =>{ 
							return (<RecipeItem
							edit={this.editRecipe}
							delete ={this.deleteRecipe}
							onDisplayChange={ (delta) => this.onDisplayChange(delta)}
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
	edit: React.PropTypes.func.isRequired,
	delete: React.PropTypes.func.isRequired,
	initialRecipes: React.PropTypes.arrayOf(React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		ingredients: React.PropTypes.array.isRequired,
		key: React.PropTypes.number.isRequired,
		})).isRequired,
}

//END OF App OUTPUT*********************************************************MAIN


ReactDOM.render(<App />, document.getElementById('app'));







