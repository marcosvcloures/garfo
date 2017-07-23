import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "../store/index.js";

const Vertex = (id, posX, posY, text) => {
    return (
        <g
            key={id}

            onClick={(e) => {
                e.preventDefault();

                store.dispatch({
                    type: 'CLICK_VERTEX',
                    from: 'GRAPH',
                    id: id
                });
            }}

            onDoubleClick={(e) => {
                e.preventDefault();

                store.dispatch({
                    type: 'DOUBLE_CLICK_VERTEX',
                    from: 'GRAPH',
                    id: id
                });
            }}

            onTouchStart={(e) => {
                store.dispatch({
                    type: 'MOUSE_DOWN_VERTEX',
                    from: 'GRAPH',
                    id: id
                });
            }}

            onMouseDown={(e) => {
                e.preventDefault();

                store.dispatch({
                    type: 'MOUSE_DOWN_VERTEX',
                    from: 'GRAPH',
                    id: id
                });
            }}

            onTouchEnd={(e) => {
                let clickEvent;

                clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('mouseup', true, true);

                document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)[0]
                    .dispatchEvent(clickEvent);

                clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('click', true, true);

                document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)[0]
                    .dispatchEvent(clickEvent);
            }}

            onMouseUp={(e) => {
                e.preventDefault();

                store.dispatch({
                    type: 'MOUSE_UP_VERTEX',
                    from: 'GRAPH',
                    id: id
                });
            }}>

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

const Edge = (id, from, to, weight, oposite) => {
    const DirectionalEdges = store.getState().Graph.present.directionalEdges;
    const WeightedEdges = store.getState().Graph.present.weightedEdges;
    let x, y;

    if (WeightedEdges || oposite) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;

        const vx = mx - from.x;
        const vy = my - from.y;

        const multi = oposite ? -30 / Math.sqrt(vx * vx + vy * vy) : -15 / Math.sqrt(vx * vx + vy * vy);

        x = mx - vy * multi;
        y = my + vx * multi;
    }

    return <g key={id}>
        {WeightedEdges && <text
            display="block"
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="central">
            {weight}
        </text>}

        {oposite ?
            <path
                d={"M " + from.x + " " + from.y + " Q " + x + " " + y + " " + to.x + " " + to.y}
                stroke="black"
                fill="transparent"
                className="edge"
                strokeWidth="3"
                strokeDasharray="0"
                markerEnd={DirectionalEdges && "url(#arrow)"}
            />
            :
            <line x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="edge"
                strokeWidth="3"
                strokeDasharray="0"
                stroke="black"
                markerEnd={DirectionalEdges && "url(#arrow)"}
            />
        }

        <g
            onClick={e => {
                e.preventDefault();

                store.dispatch({
                    type: 'CLICK_EDGE',
                    from: 'GRAPH',
                    id: id
                })
            }}

            onDoubleClick={e => {
                e.preventDefault();

                store.dispatch({
                    type: 'DOUBLE_CLICK_EDGE',
                    from: 'GRAPH',
                    id: id
                })
            }}>
            {store.getState().ControlsEdit.action === 'SELECT' && (oposite ?
                <path
                    d={"M " + from.x + " " + from.y + " Q " + x + " " + y + " " + to.x + " " + to.y}
                    stroke="transparent"
                    fill="transparent"
                    className="edge edgeClickHelper"
                    strokeWidth="20"
                />
                :
                <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className="edge edgeClickHelper"
                    strokeWidth="20"
                    strokeDasharray="0"
                    stroke="transparent"
                />)}
        </g>
    </g>;
}

const EdgeEdit = (from, to) => {
    const directionalEdges = store.getState().Graph.present.directionalEdges;

    return (
        <g>
            <line x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth="3"
                strokeDasharray="5, 5"
                stroke="black"
                markerEnd={directionalEdges && "url(#arrowEdit)"} />
        </g>
    );
}

const Graph = () => {
    const graphState = store.getState().Graph.present;
    const VertexList = graphState.vertexList;
    const EdgeList = graphState.edgeList;

    return <svg className="z-depth-1 graph-edit"
        onClick={(e) => {
            e.preventDefault();

            store.dispatch({
                type: 'CLICK_SVG',
                from: 'GRAPH',
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            })
        }}

        onTouchMove={(e) => {
            if (store.getState().ControlsEdit.action === 'ADD' || store.getState().ControlsEdit.action === 'MOVE') {
                const offset = e.target.parentElement.parentElement.getBoundingClientRect();

                this.mouseX = e.nativeEvent.touches[0].clientX - offset.left;
                this.mouseY = e.nativeEvent.touches[0].clientY - offset.top;

                store.dispatch({
                    type: 'MOUSE_MOVE',
                    from: 'GRAPH',
                    x: this.mouseX,
                    y: this.mouseY
                });
            }
        }}

        onMouseMove={(e) => {
            e.preventDefault();

            if (store.getState().ControlsEdit.action === 'ADD' || store.getState().ControlsEdit.action === 'MOVE') {
                this.mouseX = e.nativeEvent.offsetX;
                this.mouseY = e.nativeEvent.offsetY;

                store.dispatch({
                    type: 'MOUSE_MOVE',
                    from: 'GRAPH',
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY
                });
            }
        }}>

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

        {graphState.mouseDownVertex === true && store.getState().ControlsEdit.action === 'ADD' &&
            EdgeEdit(VertexList.find(e => { return e.id === graphState.mouseDownId }),
                { x: this.mouseX, y: this.mouseY })}

        {EdgeList.map(e => Edge(e.id, e.from, e.to, e.weight, e.opositeEdge))}
        {VertexList.map(e => Vertex(e.id, e.x, e.y, e.label))}
    </svg>;
}

const Button = (text, value) => {
    return <a className={store.getState().ControlsEdit.action === value ? "waves-effect btn active" : "waves-effect btn"}
        onClick={() => store.dispatch({
            type: value,
            from: 'CONTROLS_EDIT'
        })}>

        {text}

    </a>;
}

const ControlsEdit = () => {
    return <div className="side-menu">
        {Button("Selecionar", "SELECT")}
        {Button("Mover", "MOVE")}
        {Button("Inserir", "ADD")}
        {Button("Remover", "DELETE")}

        <p>
            <input type="checkbox" id="digraph" checked={store.getState().Graph.present.directionalEdges}
                onChange={() => store.dispatch({
                    type: "DIRECTIONAL_EDGES",
                    from: "GRAPH"
                })} />
            <label htmlFor="digraph">Arestas direcionais</label>
        </p>
        <p>
            <input type="checkbox" id="weighted" checked={store.getState().Graph.present.weightedEdges}
                onChange={() => store.dispatch({
                    type: "WEIGHTED_EDGES",
                    from: "GRAPH"
                })} />
            <label htmlFor="weighted">Arestas com peso</label>
        </p>
    </div>;
}

class VertexProps extends Component {
    constructor(props) {
        super(props);
        this.state = { label: store.getState().Graph.present.vertexSelected.label };
    }

    componentDidMount() {
        setTimeout((e) => { ReactDOM.findDOMNode(this).style.opacity = 1 });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter')
            this.save();
    }

    save = (e) => {
        ReactDOM.findDOMNode(this).style.opacity = 0;

        setTimeout((p) => {
            store.dispatch({
                type: 'SAVE_VERTEX',
                from: 'GRAPH',
                label: this.state.label
            })
        }, 500);
    }

    cancel = (e) => {
        ReactDOM.findDOMNode(this).style.opacity = 0;

        setTimeout((p) => {
            store.dispatch({
                type: 'SAVE_VERTEX',
                from: 'GRAPH',
                label: store.getState().Graph.present.vertexSelected.label
            })
        }, 500)
    }

    render() {
        return <div className="modal">
            <div className="modal-content">
                <h4>Editar vértice</h4>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="vertexLabel" type="text"
                            value={this.state.label}
                            autoFocus
                            onKeyPress={this.handleKeyPress}
                            onChange={(e) => this.setState({ label: e.target.value })} />
                        <label htmlFor="vertexLabel">Nome do vértice</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="modal-action modal-close waves-effect waves-green btn-flat"
                    onClick={(e) => {
                        this.save();
                    }}>
                    Salvar
                    </button>
                <button className="modal-action modal-close waves-effect waves-red btn-flat"
                    style={{ marginRight: "5px" }}
                    onClick={(e) => {
                        this.cancel();
                    }}>
                    Cancelar
                </button>
            </div>
        </div>;
    }
}

class EdgeProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: store.getState().Graph.present.edgeSelected.weight,
            capacity: store.getState().Graph.present.edgeSelected.capacity
        };
    }

    componentDidMount() {
        setTimeout((e) => { ReactDOM.findDOMNode(this).style.opacity = 1 });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter')
            this.save();
    }

    save = (e) => {
        ReactDOM.findDOMNode(this).style.opacity = 0;

        setTimeout((p) => {
            store.dispatch({
                type: 'SAVE_EDGE',
                from: 'GRAPH',
                weight: !isNaN(parseInt(this.state.weight, 10)) ? parseInt(this.state.weight, 10) : 0,
                capacity: this.state.capacity
            })
        }, 500);
    }

    cancel = (e) => {
        ReactDOM.findDOMNode(this).style.opacity = 0;

        setTimeout((p) => {
            store.dispatch({
                type: 'SAVE_EDGE',
                from: 'GRAPH',
                weight: store.getState().Graph.present.edgeSelected.weight,
                capacity: store.getState().Graph.present.edgeSelected.capacity
            })
        }, 500)
    }

    render() {
        return <div className="modal">
            <div className="modal-content">
                <h4>Editar aresta</h4>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="edgeWeight" type="text"
                            autoFocus
                            value={this.state.weight}
                            onKeyPress={this.handleKeyPress}
                            onChange={(e) =>
                                this.setState({ weight: !isNaN(parseInt(e.target.value, 10)) ? parseInt(e.target.value, 10) : null })
                            } />
                        <label htmlFor="edgeWeight">Peso</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="edgeCapacity" type="text"
                            value={this.state.capacity}
                            onKeyPress={this.handleKeyPress}
                            onChange={(e) => this.setState({ capacity: e.target.value })} />
                        <label htmlFor="edgeCapacity">Capacidade</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="modal-action modal-close waves-effect waves-green btn-flat"
                    onClick={(e) => {
                        this.save();
                    }}>
                    Salvar
                    </button>
                <button className="modal-action modal-close waves-effect waves-red btn-flat"
                    style={{ marginRight: "5px" }}
                    onClick={(e) => {
                        this.cancel();
                    }}>
                    Cancelar
                </button>
            </div>
        </div>;
    }
}

const keyHandler = (e) => {
    if (store.getState().Graph.present.vertexSelected !== null ||
        store.getState().Graph.present.edgeSelected !== null)
        return;

    if (e.keyCode === 90 && e.ctrlKey)
        return store.dispatch({ type: 'UNDO_GRAPH' });
    if (e.keyCode === 89 && e.ctrlKey)
        return store.dispatch({ type: 'REDO_GRAPH' });
    if (e.keyCode === 83)
        return store.dispatch({
            type: "SELECT",
            from: "CONTROLS_EDIT"
        });
    if (e.keyCode === 77)
        return store.dispatch({
            type: "MOVE",
            from: "CONTROLS_EDIT"
        });
    if (e.keyCode === 73)
        return store.dispatch({
            type: "ADD",
            from: "CONTROLS_EDIT"
        });
    if (e.keyCode === 82)
        return store.dispatch({
            type: "DELETE",
            from: "CONTROLS_EDIT"
        });
}

class GraphEdit extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );

        window.$(".button-collapse").sideNav({
            menuWidth: 250,
            edge: 'left',
            closeOnClick: true,
            draggable: true
        });

        document.addEventListener("keydown", keyHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", keyHandler);

        this.unsubscribe();
    }

    render() {
        const graphState = store.getState().Graph.present;

        const vertexEditing = graphState.vertexSelected !== null;
        const edgeEditing = graphState.edgeSelected !== null;

        return <div className="container">
            <div className="col side-nav" id="right-menu">
                {ControlsEdit()}
            </div>

            <div className="col l3 hide-on-med-and-down">
                {ControlsEdit()}
            </div>

            <div className="col s12 m12 l9 full-height">
                {Graph()}
            </div>

            {vertexEditing && <VertexProps key={0} />}
            {edgeEditing && <EdgeProps key={1} />}

            <div className="col s12 m12 hide-on-large-only" style={{ top: "-10px", position: "relative" }}>
                {store.getState().Graph.past.length > 0 &&
                    <span className="waves-effect waves-light btn-floating" style={{ textTransform: 'none', float: 'left' }}
                        onClick={() => store.dispatch({ type: 'UNDO_GRAPH' })}>
                        <i className="material-icons left">undo</i>
                    </span>
                }

                {store.getState().Graph.future.length > 0 &&
                    <span className="waves-effect waves-light btn-floating" style={{ textTransform: 'none', float: 'right' }}
                        onClick={() => store.dispatch({ type: 'REDO_GRAPH' })}>
                        <i className="material-icons left">redo</i>
                    </span>
                }
            </div>
        </div>;
    }
}

export default GraphEdit;