import React, { Component } from 'react';

// Form
import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     novaTarefa: '',
  //   }; // estado do componente

  //   this.changeInput = this.changeInput.bind(this);
  // }

  //  uma maneira de colocar estados (mais trablhosa)

  state = {
    novaTarefa: '',
    tarefas: ['fazer café', 'bebr agua', 'ler a biblia'],
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <form action="#" className="form">
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit className="edit" />
                <FaWindowClose className="delete" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
