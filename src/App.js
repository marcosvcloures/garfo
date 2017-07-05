import React, { Component } from 'react';
import store from './store/index.js';
import Home from './view/Home.js';

class App extends Component {
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
            <div className="App row">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a className="breadcrumb" onClick={() => {
                                store.dispatch({
                                    type: 'SET_PAGE',
                                    name: 'Home',
                                    component: <Home />
                                })
                            }}>
                                Garfo
                            </a>
                            {store.getState().Page.name !== 'Home' ?
                                <a className="breadcrumb">{store.getState().Page.name}</a>
                                :
                                null
                            }
                        </div>
                    </div>
                </nav>
                {store.getState().Page.component}
            </div >
        );
    }
}

export default App;
