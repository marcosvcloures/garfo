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
    edgeList = store.getState().Graph.present.edgeList.sort((a, b) => a.weight > b.weight ? 1 : -1);
    vertexList = store.getState().Graph.present.vertexList;

    init(vertexList.length);

    store.dispatch({
        type: 'ALGORITHM_INIT',
        vertexList: vertexList,
        edgeList: edgeList.map(e => { 
            e.color = "#ccc"; 
            e.strokeDash = "5, 5"; 
            return e; }), 
        step_func: Step,
        init_func: Init
    });
}

const Step = () => {
    if (arestaAtual !== edgeList.length) {
        let e = store.getState().Algorithm.present.edgeList.slice();

        switch(store.getState().Algorithm.present.step % 2) {
            case 0:
                e[arestaAtual].color = "orange";
                
                break;
            case 1:
                if (union(edgeList[arestaAtual].from.id, edgeList[arestaAtual].to.id) === true) {
                    e[arestaAtual].color = "black"; 
                    e[arestaAtual].strokeDash = "0";
                }
                else 
                    e[arestaAtual].color = "red";

                arestaAtual++;

                break;
            default:
                return;
        }

        store.dispatch({
            type: 'ALGORITHM_STEP',
            vertexList: vertexList,
            edgeList: e
        });
    }
    else {
        Finished();
    }
}

const Finished = () => {
    store.dispatch({
        type: 'ALGORITHM_FINISH',
        vertexList: vertexList,
        edgeList: store.getState().Algorithm.present.edgeList
    });
}

class Kruskal extends React.Component {
    componentWillMount() {
        Init();
    }

    render() {
        return <Algorithm />
    }
}

export default Kruskal;