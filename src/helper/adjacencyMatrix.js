import store from '../store/index.js';

export default function adjacencyList() {
    const graph = store.getState().Graph.present

    let matrix = new Array(graph.vertexList.length)

    for (let i = 0; i < graph.vertexList.length; i++) {
        matrix[i] = new Array(graph.vertexList.length)

        for(let j = 0; j < graph.vertexList.length; j++)
            matrix[i][j] = {weight: 0, capacity: 0}
    }

    for (let i of graph.edgeList) {
        matrix[i.from.id][i.to.id] = {weight: i.weight, capacity: i.capacity}
        
        if (!graph.directionalEdges)
            matrix[i.to.id][i.from.id] = {weight: i.weight, capacity: i.capacity}
    }

    return matrix;
}