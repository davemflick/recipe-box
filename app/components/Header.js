import React from 'react';
import { react } from 'react-dom';

export default class Header extends React.Component {
	render () {
		return (
			<div className='header'>
				<h1> Your Recipe Box </h1>
				<p> Built by <a href='https://github.com/davemflick' target='_blank'>David Flick </a></p>
			</div>
		)
	}
}