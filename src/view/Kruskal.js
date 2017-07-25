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
        edgeList: edgeList.map(e => { return {...e, color: "#ccc", strokeDash: "5"} }),
        vars: {Rank: Rank, p: p, arestaAtual: arestaAtual },
        step_func: Step,
        init_func: Init,
        vertex_click: () => null,
        edge_click: () => null
    });
}

const Step = () => {
    Rank = store.getState().Algorithm.present.vars.Rank.slice();
    p = store.getState().Algorithm.present.vars.p.slice();
    arestaAtual = store.getState().Algorithm.present.vars.arestaAtual;
    
    if (arestaAtual !== edgeList.length) {
        let e = store.getState().Algorithm.present.edgeList.slice();

        switch(store.getState().Algorithm.present.step % 2) {
            case 0:
                e[arestaAtual] = {...e[arestaAtual], color: "orange"}
                
                break;
            case 1:
                if (union(edgeList[arestaAtual].from.id, edgeList[arestaAtual].to.id) === true) 
                   e[arestaAtual] = {...e[arestaAtual], color: "black", strokeDash: "0" }
                else 
                   e[arestaAtual] = {...e[arestaAtual], color: "red"}
                
                arestaAtual++;

                break;
            default:
                return;
        }

        store.dispatch({
            type: 'ALGORITHM_STEP',
            vertexList: vertexList,
            edgeList: e,
            vars: {Rank: Rank.slice(), p: p.slice(), arestaAtual: arestaAtual }
        });
    }
    else {
        Finished();
    }
}

const Finished = () => {
    store.dispatch({
        type: 'ALGORITHM_FINISH'
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