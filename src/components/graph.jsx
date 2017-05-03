import React from "react";
import { store } from "../store/index.jsx";

class Edge extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const vertexList = store.getState().graph;

        const from = vertexList.find(e => e.id == this.props.from);
        const to = vertexList.find(e => e.id == this.props.to);

        const deltaX = to.x - from.x;
        const deltaY = to.y - from.y;
        
        const lineLenght = Math.sqrt(deltaX*deltaX + deltaY*deltaY)

        const v =  (lineLenght - 50) / lineLenght;

        return (
            <g>
                <line x1={from.x}
                    y1={from.y}
                    x2={from.x + deltaX * v}
                    y2={from.y + deltaY * v}
                    strokeWidth="5"
                    stroke="black"
                    markerEnd="url(#arrow)" />
            </g>
        );
    }
}

class Vertex extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const display_label = store.getState().controls.display_label;

        return (
            <g
                onDoubleClick={(e) => {
                    store.dispatch({
                        type: 'SELECT_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}

                onMouseDown={(e) => {
                    store.dispatch({
                        type: 'MOUSE_DOWN_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}

                onMouseUp={(e) => {
                    store.dispatch({
                        type: 'MOUSE_UP_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}>

                <circle
                    cx={this.props.x}
                    cy={this.props.y}
                    r="40"
                    stroke="black"
                    strokeWidth="3"
                    fill={this.props.selected ? "red" : "white"}
                />

                <text
                    display={display_label ? "block" : "none"}
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
        const vertexList = store.getState().graph;

        return (
            <svg
                onClick={(e) => {
                    e.preventDefault();

                    store.dispatch({
                        type: 'ADD_VERTEX',
                        from: 'GRAPH',
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY
                    })
                }}

                onMouseUp={(e) => {
                    store.dispatch({
                        type: 'MOUSE_BLANK',
                        from: 'GRAPH',
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY
                    });
                }}

                onMouseMove={(e) => {
                    store.dispatch({
                        type: 'MOUSE_MOVE',
                        from: 'GRAPH',
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY
                    });
                }}>

                <defs>
                    <marker id="arrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="3"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                        viewBox="0 0 20 20">
                        <path d="M0,0 L2,3 L0,6 L9,3 z" fill="#000" />
                    </marker>
                </defs>

                {vertexList.map(e => { return e.adjacentes.map(p => { return <Edge key={p.id} from={e.id} to={p} {...p} /> }) })}

                {vertexList.map(e => { return <Vertex key={e.id} {...e} /> })}
            </svg>
        );
    }
};

export { Graph };