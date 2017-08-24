import React from 'react';

import Home from '../view/Home.js';
import GraphEdit from '../view/GraphEdit.js';
import Dijkstra from '../view/Dijkstra.js';
import Kruskal from '../view/Kruskal.js';
import Prim from '../view/Prim.js';
import BFS from '../view/BFS.js';
import DFS from '../view/DFS.js';

const Page = (state = { id: 'Home', component: <Home /> }, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            switch (action.id) {
                case 'Home':
                    return { name: "Home", id: action.id, component: <Home /> };
                case 'Edit':
                    return { name: "Editar grafo", id: action.id, component: <GraphEdit /> };
                case 'Dijkstra':
                    return { name: "Dijkstra", id: action.id, component: <Dijkstra /> };
                case 'Kruskal':
                    return { name: "Kruskal", id: action.id, component: <Kruskal /> };
                case 'Prim':
                    return { name: "Prim", id: action.id, component: <Prim /> };
                case 'BFS':
                    return { name: "Busca em largura", id: action.id, component: <BFS /> };
                case 'DFS':
                    return { name: "Busca em profundidade", id: action.id, component: <DFS /> };
                default:
                    return { name: "404", id: action.id, component: <Home /> };
            }
        default:
            return state;
    }
};

export default Page;