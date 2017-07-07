import React, { Component } from 'react';
import ReactDOM from "react-dom";
import store from "../store/index.js";
import { ActionCreators } from 'redux-undo';

let MAIN_LOOP = null, SPEED = null;

const keyHandler = (e) => {
}

const Vertex = (id, posX, posY, text) => {
    return (
        <g key={id}
            onClick={() => store.dispatch({
                type: "VERTEX_CLICK",
                id: id
            })}>

            <circle
                cx={posX}
                cy={posY}
                r="20"
                stroke="black"
                strokeWidth="3"
                fill="white"
            />

            <text
                display="block"
                x={posX}
                y={posY}
                textAnchor="middle"
                alignmentBaseline="central">
                {text}
            </text>
        </g>
    );
}

const Edge = (id, from, to, weight, color, strokeDash) => {
    const DirectionalEdges = store.getState().Graph.present.directionalEdges;
    const WeightedEdges = store.getState().Graph.present.weightedEdges;

    let x, y;

    if (WeightedEdges) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;

        const vx = mx - from.x;
        const vy = my - from.y;

        const multi = -15 / Math.sqrt(vx * vx + vy * vy);

        x = mx - vy * multi;
        y = my + vx * multi;
    }

    return <g  key={id}>
        {WeightedEdges && <text
            display="block"
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="central">
            {weight}
        </text>}

        <line x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className="edge"
            strokeWidth="3"
            strokeDasharray={strokeDash == null ? "0" : strokeDash}
            stroke={color == null ? "black" : color }
            markerEnd={DirectionalEdges && "url(#arrow)"}
        />
    </g>;
}

const Controls = () => {
    return <div className="side-menu">
        { !store.getState().Algorithm.present.finished ? 
            store.getState().Algorithm.present.playing ?
                <a className="waves-effect btn" onClick={() => store.dispatch({ type: 'PLAY_PAUSE' })}>
                    Pausar <i className="material-icons left">pause</i>
                </a>
                :
                <a className="waves-effect btn" onClick={() => store.dispatch({ type: 'PLAY_PAUSE' })}>
                    Iniciar <i className="material-icons left">play_arrow</i>
                </a>
            :
            <a className="waves-effect btn" onClick={() => store.getState().Algorithm.present.init_func()}>
                Reiniciar <i className="material-icons left">replay</i>
            </a>
        }
        
        <a className="waves-effect btn" onClick={() => store.getState().Algorithm.present.step_func()}>
            Passo a frente <i className="material-icons left">redo</i>
        </a>
        <a className="waves-effect btn" onClick={() => store.dispatch(ActionCreators.undo())}>
            Passo atrás <i className="material-icons left">undo</i>
        </a>
        <p className="range-field">
            <input type="range" id="speed" min="1" max="5" value={store.getState().Algorithm.present.speed} onChange={(e) =>
                store.dispatch({
                    type: 'SPEED_CHANGE',
                    value: e.target.value
                })
            } />
            <label htmlFor="speed">Velocidade: {store.getState().Algorithm.present.speed}</label>
        </p>
    </div>;
}

const Graph = () => {
    const VertexList = store.getState().Algorithm.present.vertexList;
    const EdgeList = store.getState().Algorithm.present.edgeList;

    return <svg className="z-depth-1 graph-edit">
        <defs>
            <marker id="arrow"
                markerWidth="30"
                markerHeight="30"
                refX="15"
                refY="3"
                orient="auto"
                markerUnits="userSpaceOnUse"
                viewBox="0 0 15 15">
                <path d="M0,0 L2,3 L0,6 L9,3 z" fill="#000" />
            </marker>
            <marker id="arrowEdit"
                markerWidth="10"
                markerHeight="10"
                refX="2"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
                viewBox="0 0 15 15">
                <path d="M0,0 L2,3 L0,6 L9,3 z" fill="#000" />
            </marker>
        </defs>

        {EdgeList.map(e => Edge(e.id, e.from, e.to, e.weight, e.color, e.strokeDash))}
        {VertexList.map(e => Vertex(e.id, e.x, e.y, e.label))}
    </svg>;
}

class Algorithm extends Component {
    componentWillMount() {
        MAIN_LOOP = null;
        SPEED = null;
    }
    
    componentDidMount() {
        document.addEventListener("keydown", keyHandler);

        const node = ReactDOM.findDOMNode(this);

        node.style.opacity = 0;
        node.style.transition = 'all 0.6s';

        setTimeout(() => node.style.opacity = 1);

        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();

            if (store.getState().Algorithm.present.playing === true && MAIN_LOOP === null) {
                SPEED = store.getState().Algorithm.present.speed;

                MAIN_LOOP = setInterval(() => store.getState().Algorithm.present.step_func(), 2000 / store.getState().Algorithm.present.speed);
            }
            else if(store.getState().Algorithm.present.playing === false && MAIN_LOOP !== null) {
                clearInterval(MAIN_LOOP);

                MAIN_LOOP = null;
            }
            else if(store.getState().Algorithm.present.playing === true && MAIN_LOOP !== null && store.getState().Algorithm.present.speed !== SPEED) {
                clearInterval(MAIN_LOOP);

                SPEED = store.getState().Algorithm.present.speed;

                MAIN_LOOP = setInterval(() => store.getState().Algorithm.present.step_func(), 2000 / store.getState().Algorithm.present.speed);
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", keyHandler);

        clearInterval(MAIN_LOOP);

        this.unsubscribe();
    }

    render() {
        return <div className="container">
            <div className="col s3">
                {Controls()}
                <code>
                    PSEUDO-CODIGO
                </code>
            </div>

            <div className="col s9 full-height">
                {Graph()}
            </div>
        </div>;
    }
}

export default Algorithm;