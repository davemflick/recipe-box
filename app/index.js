import React from 'react';
import ReactDOM, { react } from 'react-dom';
import Header from './components/Header';
import FormControl from './components/FormControl';
import EditFormControl from './components/EditFormControl';
import RecipeItem from './components/RecipeItem';


//Set inital Recipes
let RECIPES = [
		{
			name: "Hamburger",
			ingredients: ["1 sesame seed bun", "1/2 lb ground beek", "1 egg", '3/4 tsp salt', 'sliced avocado', '1 tbsp ketchup'],
			instructions: ['Preheat grill to 350℉', 
			 'Form ground beef into a burger and sprinkle with salt',
			 'Cook burger for 5 minutes on both sides',
			 'Place on bun with avocado and ketchup',
			 'Enjoy!'],
			shown: false,
			display : 'none',
		},
		{
			name: "Pizza",
			ingredients: ["Dough", "Sauce", "Cheese", "Pepperoni"],
			instructions: ["Preheat oven to 425℉",
			 'Form dough into a circle',
			 "Spread sauce, cheese, pepperoni evenly across dough.",
			 "Place in oven 20-25 minutes",
			 "Cut and Enjoy!"],
			shown: false,
			display : 'none',
		},
		{
			name: "Cereal",
			ingredients: ["Cereal", "Milk"],
			instructions: ["You should know"],
			shown: false,
			display : 'none',
		},

	];

//Check if recipes are in local storage, if not usting initial recipes
if(localStorage.length === 0 ){
	localStorage['RECIPES'] = JSON.stringify(RECIPES);
}

let STORED_RECIPES = JSON.parse(localStorage['RECIPES']);


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
			editInstruc: '',
			editIndex: '',
		}
		this.onDisplayChange = this.onDisplayChange.bind(this);
		this.onAddRecipe = this.onAddRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
		this.onNameEdit = this.onNameEdit.bind(this);
		this.onIngEdit = this.onIngEdit.bind(this);
		this.onInstrucEdit = this.onInstrucEdit.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);

	}
//EDITING A RECIPE
	editRecipe (e) {
		this.state.displayEdit = {display: 'block'};
		this.state.editName = e.target.parentNode.firstChild.textContent;
		for(var i in this.state.recipes){
			if(this.state.recipes[i].name === this.state.editName){
				this.state.editIng = this.state.recipes[i].ingredients.toString();
				this.state.editInstruc = this.state.recipes[i].instructions.toString();
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
			editInstruc: '',
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
	onInstrucEdit (e) {
		this.state.editInstruc = e.target.value;
		this.setState(this.state);
	}

	onSubmitEdit (e) {
		e.preventDefault();
		let editedRecipe = {
			name: this.state.editName,
			ingredients: this.state.editIng.split(','),
			instructions: this.state.editInstruc.split(','),
			shown: true,
			display : 'block',
		}
		this.state.recipes.splice(this.state.editIndex, 1, editedRecipe);
		this.setState({
			recipes: this.state.recipes,
			editName: '',
			editIng: '',
			editInstruc: '',
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
		let recipeWell = delta.target.parentNode;
		let recipeList = this.state.recipes;
		for (var i in recipeList){
			if(dishName === recipeList[i].name && recipeList[i].display === 'none') {
				recipeList[i].display = 'block';
				recipeWell.className = 'jumbotron';
			} else if (dishName === recipeList[i].name && recipeList[i].display === 'block'){ 
				recipeList[i].display = 'none';
				recipeWell.className = 'well';
			}
			this.setState(this.state)
		}
	}



	onAddRecipe (name, ing, inst) {
		let ingred = ing.split(', ');
		let instruc = inst.split(',');
		this.state.recipes.push({
			name: name,
			ingredients: ingred,
			instructions: instruc,
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
					<FormControl onAddRecipe={this.onAddRecipe}/>
					<EditFormControl 
						displayEditForm={this.state.displayEdit}
						onSubmitEdit={this.onSubmitEdit} 
						closeEdit={this.closeEdit}
						editName={this.state.editName}
						onNameEdit={this.onNameEdit}
						editIng={this.state.editIng}
						onIngEdit={this.onIngEdit}
						editInstruc={this.state.editInstruc}
						onInstrucEdit={this.onInstrucEdit}
						/>

					<div className="recipeList">
						{this.state.recipes.map((recipe, index) =>{ 
							return (<RecipeItem
							transition={this.state.transition}
							edit={this.editRecipe}
							delete ={this.deleteRecipe}
							onDisplayChange={ (delta) => this.onDisplayChange(delta)}
							title={recipe.name} 
							ingr={recipe.ingredients}
							instructions={recipe.instructions}
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
	displayEditForm: React.PropTypes.func.isRequired,
	onSubmitEdit: React.PropTypes.func.isRequired,
	closeEdit: React.PropTypes.func.isRequired,
	onNameEdit: React.PropTypes.func.isRequired,
	onIngEdit: React.PropTypes.func.isRequired,
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







