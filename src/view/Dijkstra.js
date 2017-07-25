import React from 'react';

import store from '../store/index.js';

import Algorithm from './Algorithm.js';

import adjacencyList from '../helper/adjacencyList.js';

let adjList;

class Modal extends React.Component {
    componentDidMount() {
        window.$('#modalDijkstra').modal({
            dismissible: true
        })
    }

    render() {
        return <div className="modal" id="modalDijkstra">
            <div className="modal-content">
                <h4>Escolha o vértice inicial</h4>
                <div className="row">
                    <h6>O algoritmo de Dijkstra precisa de um vértice inicial!<br />
                        Para escolher o vértice inicial, basta clicar em cima do vértice desejado.</h6>
                </div>
            </div>
            <div className="modal-footer center-align">
                <button className="waves-effect waves-blue btn-flat modal-action modal-close">
                    Entendi!
                    </button>
            </div>
        </div>;
    }
}

const vertexClick = (vertex) => {
    const present = store.getState().Algorithm.present

    if (present.vars.source === null) {
        store.dispatch({
            type: 'ALGORITHM_STEP',
            vertexList: present.vertexList.map(e => {
                if (e.id === vertex.id)
                    return { ...e, color: "darkorange", helperText: '0' }
                return { ...e, color: "#ccc", helperText: '∞' }
            }),
            edgeList: present.edgeList,
            vars: {
                ...present.vars,
                source: vertex.id,
                queue: [{ id: vertex.id, cost: 0, edge: -1 }]
            }
        });
    }
}

const Step = () => {
    const present = store.getState().Algorithm.present

    if (present.vars.source !== null) {
        let visited = present.vars.visited.slice()
        let queue = present.vars.queue.map(e => e).sort((a, b) => a.cost - b.cost)

        while (queue.length > 0 && visited[queue[0].id])
            queue = queue.slice(1)

        window.queue = queue
        window.visited = visited

        if(queue.length === 0) {
            Finished();
            return;
        }

        const atual = queue[0];

        const edgeList = present.edgeList.map(e => {
            if(e.id === atual.edge)
                return {...e, color: "black", strokeDash: "0"}
            return e
        })

        visited[atual.id] = true

        for(let e of adjList[atual.id])
            if(!visited[e.to])
               queue.push({ id: e.to, cost: e.cost + atual.cost, edge: e.id })

        queue.sort((a, b) => a.cost - b.cost)

        const vertexList = present.vertexList.map(e => {
            if(e.id === present.vars.source) 
                return {...e, color: "darkorange"}
            else if(e.id === atual.id)
                return {...e, color: "black", helperText: String(atual.cost)}
            else if(!visited[e.id] && queue.find(p => p.id === e.id)) {
                return {...e, helperText: queue.find(p => p.id === e.id).cost}
            }
            return e
        })

        store.dispatch({
            type: 'ALGORITHM_STEP',
            vertexList: vertexList, 
            edgeList: edgeList,
            vars: {...present.vars, visited: visited, queue: queue}
        })
    }
    else {
        Init();
        window.$('#modalDijkstra').modal('open');
    }
}

const Init = () => {
    const graph = store.getState().Graph.present

    adjList = adjacencyList()

    store.dispatch({
        type: 'ALGORITHM_INIT',
        vertexList: graph.vertexList,
        edgeList: graph.edgeList.map(e => { return { ...e, color: "#ccc", strokeDash: "5" } }),
        vars: {
            source: null,
            visited: graph.vertexList.map(e => false)
        },
        step_func: Step,
        init_func: Init,
        vertex_click: vertexClick,
        edge_click: () => null
    });
}

const Finished = () => {
    store.dispatch({
        type: 'ALGORITHM_FINISH'
    });
}

class Dijkstra extends React.Component {
    componentWillMount() {
        Init();
    }

    render() {
        return <span>
            <Modal />
            <Algorithm />
        </span>;
    }
}

export default Dijkstra;