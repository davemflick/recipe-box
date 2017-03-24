import React from 'react';
import { react } from 'react-dom';

export default class Recipe extends React.Component {
	render (props) {
		return (
			<div className='well'>
			  <h3 className= 'dishName'> {props.dish} </h3>
			  <div className='recipe' >
				<table className='recipeTable'>
				 <thead>
				  <tr>
				   <th> Amount </th>
				   <th> Ingredient </th>
				  </tr>
				 </thead>
				  <tbody>
				   <tr className='ingItem'>
				   	<td className='ingAmount'> 1 </td>
				   	<td className='ingredient'> Sesame Seed Buns</td>
				   </tr>
				   <tr className='ingItem'>
				   	<td className='ingAmount'> 1/2 lb </td>
				   	<td className='ingredient'> Ground Beef Patty</td>
				   </tr>
				   <tr className='ingItem'>
				   	<td className='ingAmount'> 2 slices </td>
				   	<td className='ingredient'> Romain Lettuce</td>
				   </tr>
				   <tr className='ingItem'>
				   	<td className='ingAmount'> 2 tbsp  </td>
				   	<td className='ingredient'> Heinz Ketchup</td>
				   </tr>
				  </tbody>
				</table>
				</div>
				<div className='btnFlex'>
				 <button className='btn btn-info' id='editRecipe' type='button'> Edit</button>
				 <button className='btn btn-danger' id='deleteRecipe' type='button'> Delete</button>
				</div>
			</div>

		)
	}
}