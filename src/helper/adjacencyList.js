import store from '../store/index.js';

export default function adjacencyList() {
    const graph = store.getState().Graph.present
    let list = new Array(graph.vertexList.length)

    for (let i in graph.vertexList)
        list[Number(i)] = graph.edgeList.filter(e => e.from.id === Number(i)).map(e => {
            return {
                to: e.to.id,
                cost: e.weight,
                cap: e.capacity,
                id: e.id
            }
        })

    return list;
}