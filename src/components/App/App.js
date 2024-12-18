import React from 'react';
import MainPage from '../MainPage/MainPage';
import Map from '../Map/Map';
import './App.css';
import proj4 from 'proj4';
import grid from '../../Resources/ntv2_0.gsb';

class App extends React.Component {
	state = {
		converters:
			[
				{ id: 1, type: "data" },
				{ id: 2, type: "data" },
				{ id: 3, type: "file" },
			],
		coordinateSystems: []
	}

	addCoordinateBox = () => {
		this.setState(state => ({
			converters: state.converters.concat({ id: [...state.converters].pop().id+1, type: "data" })
		}))
	}

	removeCoordinateBox = (id) => {
		this.setState(state => ({
			converters: state.converters.filter(box => box.id !== id)
		}))
	}

	async loadCoordinateSystems() {
		const all = require('epsg-index/all.json');
		var result = Object.keys(all).map((key) => all[key]);
		this.setState({
			coordinateSystems: result
		});
	}

	async setupProj4() {
		fetch(grid).then(g => g.arrayBuffer()).then(g => { proj4.nadgrid('NTv2_0.gsb', g) });
	}

	componentDidMount() {
		this.loadCoordinateSystems();
		this.setupProj4();
	}

	render() {
		return (
			<div className="app" >
				<MainPage
					coordinateSystems={this.state.coordinateSystems}
					converters={this.state.converters}
					addCoordinateBox={this.addCoordinateBox}
					removeCoordinateBox={this.removeCoordinateBox}
				/>
				<Map />
			</div>
		)
	}
	
}

export default App;