import React from 'react';

import store from '../store/index.js';

import Algorithm from './Algorithm.js';

import adjacencyMatrix from '../helper/adjacencyMatrix.js';
import matrixToEdgeList from '../helper/matrixToEdgeList.js';

class Modal extends React.Component {
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);

        window.$('#modalEdmondsKarp').modal({
            dismissible: false
        })
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            window.$('#modalEdmondsKarp').modal('close')

            store.getState().Algorithm.present.init_func()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress)
    }

    render() {
        return <div className="modal" id="modalEdmondsKarp">
            <div className="modal-content">
                <h4>Escolha o vértice inicial e o vértice terminal</h4>
                <div className="row">
                    <h6>O algoritmo de Edmond's Karp precisa de um vértice inicial e um vértice terminal!<br />
                        Para escolher o vértice inicial, basta clicar em cima do vértice desejado.
                        Logo em seguida, clique em cima do vértice terminal.</h6>
                </div>
            </div>
            <div className="modal-footer center-align">
                <button className="waves-effect waves-blue btn-flat modal-action modal-close" onClick={() => {
                    window.$('#modalEdmondsKarp').modal('close')
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

const bfs = (from, to, adjMatrix) => {
    let queue = [{ id: from, parent: from }];
    let visited = new Array(adjMatrix.length)
    let parents = new Array(adjMatrix.length)

    while (queue.length && queue[0] !== to) {
        let top = queue[0].id;
        let parent = queue[0].parent

        if (!visited[top]) {
            visited[top] = 1;
            parents[top] = parent

            for (let i in adjMatrix)
                if (!visited[i] && adjMatrix[top][i].weight)
                    queue = [...queue, { id: i, parent: top }]
        }

        queue = queue.slice(1)
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
        adjMatrix[path[i - 1]][path[i]].color = "blue";
        adjMatrix[path[i - 1]][path[i]].used = true;


        adjMatrix[path[i]][path[i - 1]].weight += flow;
        adjMatrix[path[i]][path[i - 1]].color = "red";
        adjMatrix[path[i]][path[i - 1]].used = true;
    }

    return { valid: true, flow: flow }
}

const Step = () => {
    const present = store.getState().Algorithm.present
    let adjMatrix = present.vars.adjMatrix;

    if (present.vars.source !== null && present.vars.sink !== null) {
        const it = bfs(present.vars.source, present.vars.sink, adjMatrix)

        if (it.valid) {
            present.vertexList[present.vars.sink].helperText = parseInt(present.vertexList[present.vars.sink].helperText, 10) + it.flow
            store.dispatch({
                type: 'ALGORITHM_STEP',
                vertexList: present.vertexList,
                edgeList: matrixToEdgeList(present.vars.adjMatrix),
                vars: { ...present.vars }
            })
        }
        else
            Finished()
    }
    else {
        Init();
        window.$('#modalEdmondsKarp').modal('open');
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
            adjMatrix: adjMatrix,
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

class EdmondsKarp extends React.Component {
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

export default EdmondsKarp;