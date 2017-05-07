import React from "react";
import { store } from "../store/index.jsx";

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

        return (
            <g>
                <line x1={this.props.from.x}
                    y1={this.props.from.y}
                    x2={this.props.to.x}
                    y2={this.props.to.y}
                    strokeWidth="3"
                    stroke="black"
                    markerEnd={directionalEdges ? "url(#arrow)" : null}
                    onClick={e => {
                        alert('wat');
                    }} />
            </g>
        );
    }
}

class Vertex extends React.Component {
    render() {
        const displayLabel = store.getState().controls.displayLabel;

        return (
            <g
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

        let mouseX, mouseY;

        return (
            <svg
                onClick={(e) => {
                    store.dispatch({
                        type: 'CLICK_SVG',
                        from: 'GRAPH',
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY
                    })
                }}

                onMouseMove={(e) => {
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
                        markerWidth="10"
                        markerHeight="10"
                        refX="18"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
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

                { edgeList.map(e => { return <Edge key={e.id} {...e} /> })})}

                {vertexList.map(e => { return <Vertex key={e.id} {...e} /> })}
            </svg>
        );
    }
};

export { Graph };