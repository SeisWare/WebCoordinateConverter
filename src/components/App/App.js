import React from 'react';
import MainPage from '../MainPage/MainPage';
import Map from '../Map/Map';
import './App.css';

class App extends React.Component {
	state = {
		converters: [1, 2, 3, 4],
	}

	render() {
		return (
			<div className="app" >
				<MainPage converters={this.state.converters}/>
				<Map />
			</div>
		)
	}
}

export default App;