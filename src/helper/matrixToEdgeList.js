import store from '../store/index.js';

export default function matrixToEdgeList(matrix) {
    const graph = store.getState().Graph.present

    let edgeList = []
    let id = 0

    for (let i in matrix)
        for (let j in matrix)
            if (matrix[i][j].capacity !== 0 || matrix[i][j].weight !== 0 || matrix[j][i].used)
                edgeList = [...edgeList, {
                    id: id++,
                    from: graph.vertexList[i],
                    to: graph.vertexList[j],
                    opositeEdge: matrix[j][i].capacity !== 0 || matrix[j][i].weight !== 0 || matrix[j][i].used,
                    ...matrix[i][j]
                }]
            
    return edgeList;
}