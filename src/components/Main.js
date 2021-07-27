import React, { Component } from 'react';
import './Main.css';

import Form from './Form';
import Tarefas from './Tarefas';

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
    tarefas: [],
    index: -1,
  };

  // essas duas funções já vem com o react, quando um component é redenrizado na tela
  // são executados
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    // prevState => 1 estado menos uma alteração anterior
    const { tarefas } = this.state;
    if (tarefas !== prevState.tarefas) return;

    // colocando no localStorage,
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  // essas duas funções já vem com o react, quando um component é redenrizado na tela
  // são executados

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,

      });
    }
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
