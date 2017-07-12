import React, { Component } from 'react';
import store from './store/index.js';
import Home from './view/Home.js';

class App extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            store.getState().Action.type === 'SET_PAGE' &&
            this.forceUpdate()
        );

        window.$('.container').fadeIn(1000);
        window.$('.breadcrumb').fadeIn(1000);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState) {
        window.$('.container').fadeIn(600);
        window.$('.breadcrumb').fadeIn(600);
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

                            <a className="button-collapse" data-activates="right-menu"><i className="material-icons">menu</i></a>
                        </div>
                    </div>
                </nav>
                {store.getState().Page.component}
            </div >
        );
    }
}

export default App;
