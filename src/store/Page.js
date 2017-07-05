import React from 'react';
import Home from '../view/Home.js';

const Page = (state = { name: 'Home', component: <Home /> }, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return { name: action.name, component: action.component };
        default:
            return state;
    }
};

export default Page;