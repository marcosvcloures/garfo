import React, { Component } from 'react';
import store from './store/index.js';

class App extends Component {
    componentWillMount() {
        if(window.location.hash.toUpperCase() === '#PLZ')
            document.body.ovoDePascoa1()
        else if(window.location.hash.toUpperCase() === '#42')
            document.body.ovoDePascoa2()

        let nextState = { id: store.getState().Page.id, type: 'SET_PAGE' };

        window.history.replaceState(nextState, "Garfo - " + store.getState().Page.name,
            "#" + store.getState().Page.id.split(' ').join('_'));
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            store.getState().Action.type === 'SET_PAGE' &&
            this.forceUpdate()
        );

        window.$('#newContent').modal()

        setTimeout(() => window.$('.container').addClass('appear'), 10)
        setTimeout(() => window.$('.breadcrumb').addClass('appear'), 10)

        window.onpopstate = e => e.state && store.dispatch(e.state)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidUpdate() {
        let nextState = { id: store.getState().Page.id, type: 'SET_PAGE' }

        if (window.history.state.id !== nextState.id)
            window.history.pushState(nextState, "Garfo - " + store.getState().Page.name,
                "#" + store.getState().Page.id.split(' ').join('_'));

        window.$('.container').removeClass('appear')

        setTimeout(() => window.$('.container').addClass('appear'), 10)
        setTimeout(() => window.$('.breadcrumb').addClass('appear'), 10)
    }

    render() {
        return (
            <div className="App row">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a className="breadcrumb" onClick={(e) => {
                                e.preventDefault();

                                if (store.getState().Page.id !== 'Home')
                                    window.history.back();
                            }}>
                                Garfo
                            </a>
                            {store.getState().Page.id !== 'Home' ?
                                <a className="breadcrumb">{store.getState().Page.name}</a>
                                :
                                null
                            }

                            <a className="button-collapse" data-activates="right-menu"><i className="material-icons">menu</i></a>
                        </div>
                    </div>
                </nav>

                {store.getState().Page.component}

                <div id="newContent" className="modal bottom-sheet">
                    <div className="modal-content">
                        <i className="material-icons right">loop</i>
                        <h4>Atualização!</h4>
                        <p>Há uma nova versão do aplicativo! Clique no botão abaixo para atualizar.</p>
                    </div>
                    <div className="modal-footer">
                        <a onClick={() => setTimeout(() => window.location.reload(), 200) }
                            className="modal-action modal-close waves-effect waves-green btn">
                            Atualizar
                        </a>
                    </div>
                </div>
            </div >
        );
    }
}

export default App;
