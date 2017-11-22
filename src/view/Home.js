import React, { Component } from 'react';
import store from '../store'

import Clipboard from 'clipboard';

import itens from '../helper/algorithmIndex'

const is_valid = (e, filter) => {
    for (let it in e)
        if (e[it].toLowerCase().lastIndexOf(filter.toLowerCase()) !== -1)
            return true

    return false
}

const keyHandler = (e) => {
    if (e.keyCode === 9 && window.innerWidth < 1700) {
        e.preventDefault()
        return window.$('.button-collapse').click()
    }
    if (e.keyCode === 70 && e.ctrlKey) {
        e.preventDefault()
        return window.$('div.search').click()
    }
}

class ImportGraph extends Component {
    state = { json: "" }

    componentDidMount() {
        window.$('#importGraph').modal({
            dismissible: false
        });
    }

    render() {
        return <div className="modal" id="importGraph">
            <div className="modal-content">
                <h4>Importar grafo</h4>
                <div className="row" style={{ marginBottom: 0 }}>
                    <div className="input-field col m12">
                        <textarea id="jsonInput" value={this.state.json}
                            className="materialize-textarea"
                            onChange={e => this.setState({ json: e.target.value })}
                        ></textarea>
                        <label htmlFor="jsonInput">JSON exportado</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="modal-action modal-close waves-effect waves-green btn-flat"
                    onClick={e => store.dispatch({
                        from: "GRAPH",
                        type: "IMPORT_GRAPH",
                        state: this.state.json
                    })}
                >
                    Carregar
                </button>
                <button className="modal-action modal-close waves-effect waves-red btn-flat"
                    style={{ marginRight: "5px" }}>
                    Cancelar
            </button>
            </div>
        </div>
    }
}

class ExportGraph extends Component {
    componentDidMount() {
        window.$('#exportGraph').modal({
            dismissible: false
        });
    }

    render() {
        return <div className="modal" id="exportGraph">
            <div className="modal-content">
                <h4>Exportar grafo</h4>
                <div className="row" style={{ marginBottom: 0 }}>
                    <div className="input-field col m12">
                        <textarea id="jsonInput" value={JSON.stringify(store.getState().Graph.present)}
                            className="materialize-textarea"
                        ></textarea>
                        <label htmlFor="jsonInput" className="active">JSON exportado</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="modal-action modal-close waves-effect waves-green btn-flat export"
                    data-clipboard-text={JSON.stringify(store.getState().Graph.present)}
                >
                    Copiar para a área de transferência
                </button>
                <button className="modal-action modal-close waves-effect waves-red btn-flat"
                    style={{ marginRight: "5px" }}>
                    Fechar
            </button>
            </div>
        </div>
    }
}

class DefaultGraphs extends Component {
    data = [
        { name: "K5", id: "k5", img: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Complete_graph_K5.svg' },
        { name: "K3,3", id: "k33", img: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Biclique_K_3_3.svg' },
        { name: "Petersen", id: "petersen", img: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Petersen1_tiny.svg' },
        { name: "Cubo", id: "cubo", img: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/3-cube_column_graph.svg' },
    ]

    state = { canSend: false, searchFor: "" }

    input = null

    loadGraph = id => {
        window.$('#graphLoad').modal('close')

        store.dispatch({
            type: "SET_PAGE",
            id: "Load",
            default: id
        })
    }

    componentDidMount() {
        let data = {};

        for (let it of this.data)
            data[it.name] = it.img

        window.$('#graphLoad').modal({
            dismissible: false,
            ready: e => {
                window.$('#graphName').autocomplete({
                    data: data,
                    limit: 4,
                    onAutocomplete: e => this.loadGraph(this.data.filter(p => p.name.toLowerCase().lastIndexOf(e.toLowerCase()) !== -1)[0].id),
                    minLength: 0,
                })

                this.input.focus();
            }
        });
    }

    render() {
        return <div className="modal" id="graphLoad">
            <div className="modal-content">
                <h4>Carregar grafo padrão</h4>
                <div className="row">
                    <div className="input-field col m12">
                        <input id="graphName" ref={e => this.input = e} type="text" autoFocus onChange={e => this.setState({
                            searchFor: e.target.value,
                            canSend: this.data.filter(p => p.name.toLowerCase().lastIndexOf(e.target.value.toLowerCase()) !== -1).length === 1
                        })} />
                        <label htmlFor="graphName">Nome do grafo</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className={"modal-action modal-close waves-effect waves-green btn-flat" + (this.state.canSend ? "" : " disabled")}
                    onClick={e => this.loadGraph(this.data.filter(p => p.name.toLowerCase().lastIndexOf(this.state.searchFor.toLowerCase()) !== -1)[0].id)}>
                    Carregar
                </button>
                <button className="modal-action modal-close waves-effect waves-red btn-flat"
                    style={{ marginRight: "5px" }}>
                    Cancelar
            </button>
            </div>
        </div>
    }
}

class Item extends Component {
    render() {
        return <div className="col s12 m6 l4">
            <div className="card small teal lighten-2 hoverable" onClick={(e) => {
                store.dispatch({
                    type: 'SET_PAGE',
                    id: this.props.id
                })
            }}>
                <div className="card-content white-text">
                    <span className="card-title">{this.props.name}</span>
                    <p>{this.props.desc}</p>
                </div>
                <div className="card-action center-align teal darken-2">
                    <a>Acessar</a>
                </div>
            </div>
        </div>
    }
}

class Home extends Component {
    state = { searching: false, searchFor: '' }

    componentDidMount() {
        document.addEventListener("keydown", keyHandler)

        window.$(".button-collapse").sideNav({
            menuWidth: 250,
            edge: 'left',
            closeOnClick: true,
            onOpen: () => {
                window.$('.blurrable').addClass('blurred')
                window.$('nav').addClass('blurred')
                window.$('div.col.s12').addClass('blurred')
            },
            onClose: () => {
                window.$('.blurrable').removeClass('blurred')
                window.$('nav').removeClass('blurred')
                window.$('div.col.s12').removeClass('blurred')

                while (window.$('#sidenav-overlay').length)
                    window.$('#sidenav-overlay').replaceWith('')
            },
            draggable: true
        });

        new Clipboard('.export');
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', keyHandler)
    }

    render() {
        let empty = true

        return <div className="container">
            <div className={"search blurrable" + (this.state.searching ? " active" : "")} onClick={() => this.setState({ searching: true })}>
                {this.state.searching ?
                    <input type="text" placeholder="Pesquisar..." autoFocus
                        onFocus={e => e.target.select()}
                        onBlur={() => this.setState({ searching: false })}
                        value={this.state.searchFor}
                        onChange={e => this.setState({ searchFor: e.target.value })} />
                    :
                    <i className="material-icons">search</i>
                }
            </div>

            <div className="col side-nav" id="right-menu">
                <div className="side-menu">
                    <a className="waves-effect btn" onClick={e => {
                        window.$('#graphLoad').modal('open')
                    }}>Carregar grafo padrão</a>
                    <a className="waves-effect btn" onClick={e => window.$('#importGraph').modal('open')}>
                        Importar grafo</a>
                    <a className="waves-effect btn" onClick={e =>
                        window.$("#exportGraph").modal('open')
                        //console.log(JSON.stringify(store.getState().Graph.present.edgeList.map(e => { return { from: e.from.id, to: e.to.id } })))
                    }>
                        Exportar grafo atual
                    </a>
                </div>
            </div>

            <DefaultGraphs />

            <ImportGraph />

            <ExportGraph />
            
            <div className="row">
                {itens.map((e, id) => {
                    if (is_valid(e, this.state.searchFor)) {
                        empty = false

                        return <Item {...e} key={id} />
                    }

                    return null
                })}

                {empty && <div className='col s12 center'>
                    <i className="material-icons nothing-found" style={{
                        fontSize: '5em',
                        marginTop: '20px'
                    }}></i>
                    <h4>Nada encontrado.</h4>
                    <p>Não foi possível encontrar nenhum algoritmo que corresponde a sua pesquisa!</p>
                    <p>
                        <a href="mailto:marcosvcloures@gmail.com?Subject=Garfo:%20Sujest&atilde;o">Mande uma sugestão</a>
                    </p>
                </div>
                }
            </div>
        </div>;
    }
}

export default Home;