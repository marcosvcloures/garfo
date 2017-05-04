import React from "react";
import { store } from "../store/index.jsx";

class EdgeEdit extends React.Component {
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

        return (
            <g>
                <line x1={from.x}
                    y1={from.y}
                    x2={this.props.x}
                    y2={this.props.y}
                    strokeWidth="3"
                    strokeDasharray="5, 5"
                    stroke="black"
                    markerEnd="url(#arrow)"
                    onClick={e => {
                        alert('wat');
                    }} />
            </g>
        );
    }
}

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

        const lineLenght = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        const v = (lineLenght - 50) / lineLenght;

        return (
            <g>
                <line x1={from.x}
                    y1={from.y}
                    x2={from.x + deltaX * v}
                    y2={from.y + deltaY * v}
                    strokeWidth="3"
                    stroke="black"
                    markerEnd="url(#arrow)"
                    onClick={e => {
                        alert('wat');
                    }} />
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
                onClick={(e) => {
                    store.dispatch({
                        type: 'CLICK_VERTEX',
                        from: 'GRAPH',
                        id: this.props.id
                    });
                }}

                onDoubleClick={(e) => {
                    store.dispatch({
                        type: 'DOUBLE_CLICK_VERTEX',
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
        let mouse_x, mouse_y;

        return (
            <svg
                onClick={(e) => {
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
                    if (store.getState().controls.action == 'MOVE') {
                        store.dispatch({
                            type: 'MOUSE_MOVE',
                            from: 'GRAPH',
                            x: e.nativeEvent.offsetX,
                            y: e.nativeEvent.offsetY
                        });
                    }
                    else if (store.getState().controls.action == 'ADD') {
                        this.mouse_x = e.nativeEvent.offsetX;
                        this.mouse_y = e.nativeEvent.offsetY;

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

                {store.getState().graph.mouseDownVertex == true && store.getState().controls.action == 'ADD' ?
                    <EdgeEdit key={0} from={store.getState().graph.mouseDownId} x={this.mouse_x} y={this.mouse_y} />
                    :
                    null}

                {vertexList.map(e => { return e.adjacentes.map(p => { return <Edge key={p.id} from={e.id} to={p} {...p} /> }) })}

                {vertexList.map(e => { return <Vertex key={e.id} {...e} /> })}
            </svg>
        );
    }
};

export { Graph };