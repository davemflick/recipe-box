import React from 'react';
import { render } from 'react-dom';
import styles from "!style-loader!css-loader!sass-loader!./styles/main.scss";
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Main />
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));