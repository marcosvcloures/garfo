import React, { Component } from 'react';

import GraphEdit from './view/GraphEdit.js';

class App extends Component {
  render() {
    return (
      <div className="App row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a className="breadcrumb">Garfo</a>
              <a className="breadcrumb">Editar grafo</a>
            </div>
          </div>
        </nav>
        <GraphEdit />
      </div>
    );
  }
}

export default App;
