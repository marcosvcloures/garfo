import React from 'react';

import store from '../store/index.js';

import Algorithm from './Algorithm.js';

import adjacencyMatrix from '../helper/adjacencyMatrix.js';
import matrixToEdgeList from '../helper/matrixToEdgeList.js';

class Modal extends React.Component {
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);

        window.$('#modalFordFulkerson').modal({
            dismissible: false
        })
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            window.$('#modalFordFulkerson').modal('close')

            store.getState().Algorithm.present.init_func()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress)
    }

    render() {
        return <div className="modal" id="modalFordFulkerson">
            <div className="modal-content">
                <h4>Escolha o vértice inicial e o vértice terminal</h4>
                <div className="row">
                    <h6>O algoritmo de Ford Fulkerson precisa de um vértice inicial e um vértice terminal!<br />
                        Para escolher o vértice inicial, basta clicar em cima do vértice desejado.
                        Logo em seguida, clique em cima do vértice terminal.</h6>
                </div>
            </div>
            <div className="modal-footer center-align">
                <button className="waves-effect waves-blue btn-flat modal-action modal-close" onClick={() => {
                    window.$('#modalFordFulkerson').modal('close')
                    store.getState().Algorithm.present.init_func()
                }}>
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
                    return { ...e, color: "darkorange" }
                return { ...e, color: "#ccc" }
            }),
            edgeList: present.edgeList,
            vars: {
                ...present.vars,
                source: vertex.id
            }
        });
    }

    else if (present.vars.sink == null) {
        store.dispatch({
            type: 'ALGORITHM_STEP',
            vertexList: present.vertexList.map(e => {
                if (e.id === vertex.id)
                    return { ...e, color: "red", helperText: '0' }
                return e
            }),
            edgeList: present.edgeList,
            vars: {
                ...present.vars,
                sink: vertex.id
            }
        });
    }
}

const dfs = (from, to, adjMatrix, originalMatrix) => {
    let queue = [{ id: from, parent: from }];
    let visited = new Array(adjMatrix.length)
    let parents = new Array(adjMatrix.length)

    while (queue.length && queue[queue.length - 1] !== to) {
        let top = queue[queue.length - 1].id;
        let parent = queue[queue.length - 1].parent

        queue.pop()

        if (!visited[top]) {
            visited[top] = 1;
            parents[top] = parent

            for (let i = adjMatrix.length - 1; i >= 0; i--)
                if (!visited[i] && adjMatrix[top][i].weight) 
                    queue = [...queue, { id: i, parent: top }]
        }
    }

    if (parents[to] === undefined)
        return { valid: false }

    let flow = Infinity;
    let atual = to
    let path = [to]

    while (atual !== from) {
        flow = Math.min(flow, adjMatrix[parents[atual]][atual].weight)
        path = [parents[atual], ...path]

        atual = parents[atual]
    }

    for (let i = 1; i < path.length; i++) {
        adjMatrix[path[i - 1]][path[i]].weight -= flow;

        let equal = adjMatrix[path[i - 1]][path[i]].weight === originalMatrix[path[i - 1]][path[i]].weight;

        adjMatrix[path[i - 1]][path[i]].color = equal ? "#ccc" : "blue";
        adjMatrix[path[i - 1]][path[i]].used = !equal;

        adjMatrix[path[i]][path[i - 1]].weight += flow;

        equal = adjMatrix[path[i]][path[i - 1]].weight === originalMatrix[path[i]][path[i - 1]].weight;

        adjMatrix[path[i]][path[i - 1]].color = equal ? "#ccc" : "red";
        adjMatrix[path[i]][path[i - 1]].used = !equal;
    }

    return { valid: true, flow: flow }
}

const Step = () => {
    const present = store.getState().Algorithm.present    
    let adjMatrix = present.vars.adjMatrix.map(e => e.map(f => { return {...f} }));

    if (present.vars.source !== null && present.vars.sink !== null) {
        const it = dfs(present.vars.source, present.vars.sink, adjMatrix, present.vars.originalMatrix)

        if (it.valid) {
            present.vertexList[present.vars.sink].helperText = present.vars.flow + it.flow
            store.dispatch({
                type: 'ALGORITHM_STEP',
                vertexList: present.vertexList,
                edgeList: matrixToEdgeList(adjMatrix),
                vars: { ...present.vars, adjMatrix: adjMatrix, flow: present.vars.flow + it.flow }
            })
        }
        else
            Finished()
    }
    else {
        Init();
        window.$('#modalFordFulkerson').modal('open');
    }
}

const Init = () => {
    const graph = store.getState().Graph.present

    let adjMatrix = adjacencyMatrix()

    for (let i in adjMatrix)
        for (let j in adjMatrix) {
            adjMatrix[i][j].color = "#ccc"
            adjMatrix[i][j].strokeDash = "5"
        }

    store.dispatch({
        type: 'ALGORITHM_INIT',
        vertexList: graph.vertexList,
        edgeList: matrixToEdgeList(adjMatrix),
        vars: {
            source: null,
            sink: null,
            originalMatrix: adjMatrix,
            adjMatrix: adjMatrix,
            flow: 0,
            directionalEdges: true
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

class FordFulkerson extends React.Component {
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

export default FordFulkerson;