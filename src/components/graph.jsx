import React from "react";
import ReactDOM from "react-dom";
import { store } from "../store/index.jsx";
import { Row, Input } from 'react-materialize';

class EdgeProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            weight: store.getState().graph.present.edgeSelected.weight,
            capacity: store.getState().graph.present.edgeSelected.capacity 
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
                weight: this.state.weight,
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
                weight: store.getState().graph.present.edgeSelected.weight,
                capacity: store.getState().graph.present.edgeSelected.capacity 
            })
        }, 500)
    }

    render() {
        return <div className="modal">
            <div className="modal-content">
                <h4>Editar aresta</h4>
                <Row>
                    <Input label="Peso"
                        autoFocus
                        value={this.state.weight}
                        onKeyPress={this.handleKeyPress}
                        onChange={
                            (e) => { 
                                this.setState({ weight: e.target.value }) }
                        }
                    />
                    <Input label="Capacidade"
                        value={this.state.capacity}
                        onKeyPress={this.handleKeyPress}
                        onChange={
                            (e) => { 
                                this.setState({ capacity: e.target.value }) 
                            }
                        }
                    />
                </Row>
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

class EdgeEdit extends React.Component {
    render() {
        const directionalEdges = store.getState().controls.directionalEdges;

        return (
            <g>
                <line x1={this.props.from.x}
                    y1={this.props.from.y}
                    x2={this.props.to.x}
                    y2={this.props.to.y}
                    strokeWidth="3"
                    strokeDasharray="5, 5"
                    stroke="black"
                    markerEnd={directionalEdges ? "url(#arrowEdit)" : null} />
            </g>
        );
    }
}

class Edge extends React.Component {
    render() {
        const directionalEdges = store.getState().controls.directionalEdges;

        const mx = (this.props.from.x + this.props.to.x) / 2;
        const my = (this.props.from.y + this.props.to.y) / 2;

        const vx = mx - this.props.from.x;
        const vy = my - this.props.from.y;

        const multi = -15 / Math.sqrt(vx * vx + vy * vy);

        const x = mx - vy * multi;
        const y = my + vx * multi;

        return (
            <g>
                <text
                    display="block"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    alignmentBaseline="central">
                    {this.props.weight}
                </text>

                <line x1={this.props.from.x}
                    y1={this.props.from.y}
                    x2={this.props.to.x}
                    y2={this.props.to.y}
                    className="edge"
                    strokeWidth="3"
                    strokeDasharray={store.getState().graph.edgeSelected != null ? "5, 5" : "0"}
                    stroke="black"
                    markerEnd={directionalEdges ? "url(#arrow)" : null}
                    onClick={e => {
                        e.preventDefault();

                        store.dispatch({
                            type: 'CLICK_EDGE',
                            from: 'GRAPH',
                            edge: this.props
                        })
                    }}

                    onDoubleClick={e => {
                        e.preventDefault();

                        store.dispatch({
                            type: 'DOUBLE_CLICK_EDGE',
                            from: 'GRAPH',
                            id: this.props.id
                        })
                    }} />
            </g>
        );
    }
}

class VertexProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { label: store.getState().graph.present.vertexSelected.label };
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
                label: store.getState().graph.present.vertexSelected.label
            })
        }, 500)
    }

    render() {
        return <div className="modal">
            <div className="modal-content">
                <h4>Editar vértice</h4>
                <Row>
                    <Input label="Nome do vértice"
                        autoFocus
                        value={this.state.label}
                        onKeyPress={this.handleKeyPress}
                        onChange={
                            (e) => { this.setState({ label: e.target.value }) }
                        }
                    />
                </Row>
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

class Vertex extends React.PureComponent {
    render() {
        const displayLabel = store.getState().controls.displayLabel;

        return (
            <g
                onClick={(e) => {
                    e.preventDefault();

                    store.dispatch({
                        type: 'CLICK_VERTEX',
                        from: 'GRAPH',
                        vertex: this.props
                    });
                }}

                onDoubleClick={(e) => {
                    e.preventDefault();

                    store.dispatch({
                        type: 'DOUBLE_CLICK_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}

                onMouseDown={(e) => {
                    e.preventDefault();

                    store.dispatch({
                        type: 'MOUSE_DOWN_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}

                onMouseUp={(e) => {
                    e.preventDefault();

                    store.dispatch({
                        type: 'MOUSE_UP_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}>

                <circle
                    cx={this.props.x}
                    cy={this.props.y}
                    r="20"
                    stroke="black"
                    strokeWidth="3"
                    fill={this.props.selected ? "red" : "white"}
                />

                <text
                    display={displayLabel ? "block" : "none"}
                    x={this.props.x}
                    y={this.props.y}
                    textAnchor="middle"
                    alignmentBaseline="central">
                    {this.props.label}
                </text>
            </g>
        );
    }
}

class Graph extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const graphState = store.getState().graph.present;
        const vertexList = graphState.vertexList;
        const edgeList = graphState.edgeList;
        const vertexEditing = graphState.vertexSelected != null;
        const edgeEditing = graphState.edgeSelected != null;
        let mouseX, mouseY;

        return (
            <div className="fullHeight">
                {vertexEditing ? <VertexProps key={0} /> : null}
                {edgeEditing ? <EdgeProps key={0} /> : null}

                <svg
                    onClick={(e) => {
                        e.preventDefault();

                        store.dispatch({
                            type: 'CLICK_SVG',
                            from: 'GRAPH',
                            x: e.nativeEvent.offsetX,
                            y: e.nativeEvent.offsetY
                        })
                    }}

                    onMouseMove={(e) => {
                        e.preventDefault();

                        if (store.getState().controls.action == 'ADD' || store.getState().controls.action == 'MOVE') {
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

                    {graphState.mouseDownVertex == true && store.getState().controls.action == 'ADD' ?
                        <EdgeEdit key={0}
                            from={vertexList.find(e => { return e.id == graphState.mouseDownId })}
                            to={{ x: this.mouseX, y: this.mouseY }} />
                        :
                        null}

                    {edgeList.map(e => { return <Edge key={e.id} {...e} /> })})}

                    {vertexList.map(e => { return <Vertex key={e.id} {...e} /> })}
                </svg>
            </div>
        );
    }
};

export { Graph };