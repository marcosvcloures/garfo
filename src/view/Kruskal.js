import React from 'react';
import store from '../store/index.js';

import Algorithm from './Algorithm.js';

let Rank, p, n, arestaAtual, edgeList, vertexList;

function init(_n) {
    n = _n;
    Rank = [];
    p = [];
    arestaAtual = 0;

    for (let i = 0; i < n; i++) {
        Rank.push(0);
        p.push(i);
    }

    console.log(Rank, p);
}

function find(x) {
    return x === p[x] ? x : (p[x] = find(p[x]));
}

function union(a, b) {
    a = find(a);
    b = find(b);

    if (a === b)
        return false;

    if (Rank[a] < Rank[b])
        [a, b] = [b, a];
    if (Rank[a] === Rank[b])
        ++Rank[a];

    p[b] = a;

    return true;
}


const Init = () => {
    edgeList = store.getState().Graph.present.edgeList.sort((a, b) => a.weight > b.weight);
    vertexList = store.getState().Graph.present.vertexList;

    init(vertexList.length);

    store.dispatch({
        type: 'ALGORITHM_INIT',
        vertexList: vertexList,
        edgeList: [], 
        step_func: Step
    });
}

const Step = () => {
    if (arestaAtual !== edgeList.length) {
        if (union(edgeList[arestaAtual].from.id, edgeList[arestaAtual].to.id) === true) {
            store.dispatch({
                type: 'ALGORITHM_STEP',
                vertexList: vertexList,
                edgeList: [...store.getState().Algorithm.present.edgeList, edgeList[arestaAtual]]
            });

            console.log(edgeList[arestaAtual]);
        }
        else {
            store.dispatch({
                type: 'ALGORITHM_STEP',
                vertexList: vertexList,
                edgeList: [...store.getState().Algorithm.present.edgeList, {...edgeList[arestaAtual], color: "red", strokeDash: "5, 5"}]
            });
        }

        arestaAtual++;
    }
    else {
        Finneshed();
    }
}

const Finneshed = () => {
    store.dispatch({
        type: 'ALGORITHM_FINNISH',
        vertexList: vertexList,
        edgeList: store.getState().Algorithm.present.edgeList
    });
}

class Kruskal extends React.Component {
    componentWillMount() {
        Init();
    }

    render() {
        return <div className="full-height">
            <Algorithm />
        </div>
    }
}

export default Kruskal;