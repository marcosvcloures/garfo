import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import "./css/main.css";

import { Controls } from "./components/controls.jsx";
import { Graph } from "./components/graph.jsx";
import { store } from "./store/index.jsx";

class App extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="container fullHeight">
                <div className="row fullHeight">
                    <div className="three columns fullHeight">
                        <Controls />
                    </div>
                    <div className="nine columns fullHeight">
                        <Graph />
                    </div>
                </div>
            </div>);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

export { store };