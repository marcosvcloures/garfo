import React from 'react';

import Home from '../view/Home.js';
import GraphEdit from '../view/GraphEdit.js';
import Dijkstra from '../view/Dijkstra.js';
import Kruskal from '../view/Kruskal.js';

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
                default:
                    return { name: "404", id: action.id, component: <Home /> };
            }
        default:
            return state;
    }
};

export default Page;