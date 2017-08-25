import React, { Component } from 'react';
import store from '../store/index.js';

const itens = [{ id: 'Edit', name: 'Editar grafo', desc: 'Edite o grafo utilizado para a execução dos algoritmos.' },
{ id: 'Kruskal', name: 'Kruskal', desc: 'Um dos algoritmos mais famosos para o problema da árvore geradora mínima (MST).' },
{ id: 'Dijkstra', name: 'Dijkstra', desc: 'O algoritmo mais utilizado para o problema do caminho mínimo entre de fonte única. (SSSP)' },
{ id: 'Prim', name: 'Prim', desc: 'Famoso algoritmo para a resolução do problema da árvore geradora mínima (MST).' },
{ id: 'BFS', name: 'Busca em largura', desc: 'Algoritmo que percorre o grafo em largura (BFS).' },
{ id: 'DFS', name: 'Busca em profundidade', desc: 'Algoritmo que percorre o grafo em profundidade (DFS).' }]

const is_valid = (e, filter) => {
    for (let it in e)
        if (e[it].toLowerCase().lastIndexOf(filter.toLowerCase()) !== -1)
            return true

    return false
}

class Item extends Component {
    render() {
        //if (!this.props.filter || valid) {
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
        //}

        //return null
    }
}

class Home extends Component {
    state = { searching: false, searchFor: '' }

    render() {
        let empty = true

        return <div className="container">
            <div className={"search " + (this.state.searching ? " active" : "")} onClick={() => this.setState({ searching: true })}>
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
            <div className="row">
                {itens.map((e, id) => {
                    if(is_valid(e, this.state.searchFor)) {
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
                    <p><a href="mailto:marcosvcloures@gmail.com?Subject=Garfo:%20Sujest&atilde;o">Mande uma sugestão</a></p>
                    </div>}
            </div>
        </div>;
    }
}

export default Home;