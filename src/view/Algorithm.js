import React, { Component } from 'react';
import store from "../store/index.js";

let MAIN_LOOP = null, SPEED = null;

const keyHandler = (e) => {
}

const Vertex = (vertex) => {
    return (
        <g key={vertex.id}
            onClick={() => {
                if (typeof (store.getState().Algorithm.present.vertex_click) === "function")
                    store.getState().Algorithm.present.vertex_click(vertex)
            }}>

            <circle
                cx={vertex.x}
                cy={vertex.y}
                r="20"
                stroke={vertex.color || "black"}
                strokeWidth="3"
                strokeDasharray={vertex.strokeDash || '0'}
                fill="white"
            />

            <text
                display="block"
                x={vertex.x}
                y={vertex.y}
                textAnchor="middle"
                alignmentBaseline="central">
                {vertex.label}
            </text>

            {vertex.helperText &&
                <text
                    display="block"
                    x={vertex.x + 20}
                    y={vertex.y - 20}
                    textAnchor="start"
                    alignmentBaseline="central">
                    {vertex.helperText}
                </text>
            }
        </g>
    );
}

const Edge = (edge) => {
    const DirectionalEdges = store.getState().Graph.present.directionalEdges;
    const WeightedEdges = store.getState().Graph.present.weightedEdges;

    let x, y, loop;

    if (edge.from === edge.to)
        loop = true;
    else
        loop = false;

    if (loop) {
        x = edge.from.x;
        y = edge.from.y + 70;
    }
    else if (WeightedEdges || edge.opositeEdge) {
        const mx = (edge.from.x + edge.to.x) / 2;
        const my = (edge.from.y + edge.to.y) / 2;

        const vx = mx - edge.from.x;
        const vy = my - edge.from.y;

        const multi = edge.opositeEdge ? -30 / Math.sqrt(vx * vx + vy * vy) : -15 / Math.sqrt(vx * vx + vy * vy);

        x = mx - vy * multi;
        y = my + vx * multi;
    }

    return <g key={edge.id}>
        {WeightedEdges && <text
            display="block"
            x={x}
            y={y + (loop ? - 20 : 0)}
            textAnchor="middle"
            alignmentBaseline="central">
            {edge.weight}
        </text>}

        {edge.opositeEdge || loop ?
            <path
                d={"M " + edge.from.x + " " + edge.from.y + " Q " + x + " " + y + " " + edge.to.x + " " + edge.to.y}
                stroke={edge.color || "black"}
                fill="transparent"
                className="edge"
                strokeWidth="3"
                strokeDasharray={edge.strokeDash || '0'}
                markerEnd={DirectionalEdges && "url(#arrow)"}
            />
            :
            <line x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                className="edge"
                strokeWidth="3"
                strokeDasharray={edge.strokeDash || '0'}
                stroke={edge.color || "black"}
                markerEnd={DirectionalEdges && "url(#arrow)"}
            />
        }
    </g>;
}

const Controls = () => {
    return <div className="side-menu">
        {!store.getState().Algorithm.present.finished ?
            store.getState().Algorithm.present.playing ?
                <a className="waves-effect btn" onClick={() => store.dispatch({ type: 'PLAY_PAUSE' })}>
                    Pausar <i className="material-icons left">pause</i>
                </a>
                :
                <a className="waves-effect btn" onClick={() => store.dispatch({ type: 'PLAY_PAUSE' })}>
                    Iniciar <i className="material-icons left">play_arrow</i>
                </a>
            :
            <span className="waves-effect btn" onClick={() => store.getState().Algorithm.present.init_func()}>
                Reiniciar <i className="material-icons left">replay</i>
            </span>
        }

        {!store.getState().Algorithm.present.finished &&
            <span className="waves-effect btn" onClick={() => store.getState().Algorithm.present.step_func()}>
                Passo a frente <i className="material-icons left">redo</i>
            </span>
        }

        {store.getState().Algorithm.past.length > 0 &&
            <span className="waves-effect btn" onClick={() => store.dispatch({ type: 'UNDO_ALGORITHM' })}>
                Passo atrás <i className="material-icons left">undo</i>
            </span>
        }

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
                <path d="M0,0 L2,3 L0,6 L9,3 z" fill="context-stroke" />
            </marker>
            <marker id="arrowEdit"
                markerWidth="10"
                markerHeight="10"
                refX="2"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
                viewBox="0 0 15 15">
                <path d="M0,0 L2,3 L0,6 L9,3 z" fill="context-stroke" />
            </marker>
        </defs>

        {EdgeList.map(e => Edge(e))}
        {VertexList.map(e => Vertex(e))}
    </svg>;
}

class Algorithm extends Component {
    componentWillMount() {
        MAIN_LOOP = null;
        SPEED = null;
    }

    componentDidMount() {
        document.addEventListener("keydown", keyHandler);

        window.$(".button-collapse").sideNav({
            menuWidth: 250,
            edge: 'left',
            closeOnClick: true,
            draggable: true
        });

        this.unsubscribe = store.subscribe(() => {
            if (store.getState().Action.type === 'SET_PAGE')
                return;

            this.forceUpdate();

            if (store.getState().Algorithm.present.playing === true && MAIN_LOOP === null) {
                SPEED = store.getState().Algorithm.present.speed;

                MAIN_LOOP = "gambiarra :3"
                store.getState().Algorithm.present.step_func()

                MAIN_LOOP = setInterval(() => {
                    if (store.getState().Algorithm.present.playing)
                        store.getState().Algorithm.present.step_func()
                }, 2000 / store.getState().Algorithm.present.speed);
            }
            else if (store.getState().Algorithm.present.playing === false && MAIN_LOOP !== null) {
                clearInterval(MAIN_LOOP);

                MAIN_LOOP = null;
            }
            else if (store.getState().Algorithm.present.playing === true && MAIN_LOOP !== null && store.getState().Algorithm.present.speed !== SPEED) {
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
            <div className="col side-nav" id="right-menu">
                {Controls()}
            </div>

            <div className="col l3 hide-on-med-and-down">
                {Controls()}
            </div>

            <div className="col s12 m12 l9 full-height">
                {Graph()}
            </div>

            <div className="col s12 m12 hide-on-large-only" style={{ top: "-10px", position: "relative" }}>
                {store.getState().Algorithm.past.length > 0 &&
                    <span className="waves-effect btn-floating" style={{ textTransform: 'none', float: 'left' }}
                        onClick={() => store.dispatch({ type: 'UNDO_ALGORITHM' })}>
                        <i className="material-icons left">undo</i>
                    </span>
                }

                {!store.getState().Algorithm.present.finished ?
                    <span className="waves-effect btn-floating" style={{ textTransform: 'none', float: 'right' }}
                        onClick={() => store.getState().Algorithm.present.step_func()}>
                        <i className="material-icons left">redo</i>
                    </span>
                    :
                    <span className="waves-effect btn" style={{ textTransform: 'none', float: 'right' }}
                        onClick={() => store.getState().Algorithm.present.init_func()}>
                        Reiniciar
                        <i className="material-icons right">replay</i>
                    </span>
                }
            </div>
        </div>;
    }
}

export default Algorithm;