import React from 'react';
import MainPage from '../MainPage/MainPage';
import Map from '../Map/Map';
import './App.css';

class App extends React.Component {
	state = {
		converters:
			[
				{ id: 1, type: "data" },
				{ id: 2, type: "data" },
				{ id: 3, type: "file" },
			],
	}

	removeCoordinateBox = (id) => {
		this.setState(state => ({
			converters: state.converters.filter(box => box.id !== id)
		}))
	}
	render() {
		return (
			<div className="app" >
				{console.log(this.state.converters)}
				<MainPage
					converters={this.state.converters}
					removeCoordinateBox={this.removeCoordinateBox}
				/>
				<Map />
			</div>
		)
	}
	
}

export default App;