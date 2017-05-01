import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import "./less/main.less";

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
        return (<Graph />);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

export { store };