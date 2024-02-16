import  { useState, useEffect } from 'react';
import { Item, Container, TodoList, Input, Button, List } from './styles';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorQueTaDentroDoInput, setValorQueTaDentroDoInput] = useState('');

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasArmazenadas) {
      setTarefas(tarefasArmazenadas);
    }
  }, []);

  function quandoEuDigitoNoInput(event) {
    setValorQueTaDentroDoInput(event.target.value);
  }

  function quandoClicaNoBotao() {
    if (valorQueTaDentroDoInput.trim() !== '') {
      const novasTarefas = [...tarefas, valorQueTaDentroDoInput];
      setTarefas(novasTarefas);
      localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
      setValorQueTaDentroDoInput('');
    }
  }

  function removerTarefa(index) {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  return (
    <Container>
      <TodoList>
        <Input
          placeholder="Digite a sua tarefa"
          value={valorQueTaDentroDoInput}
          onChange={quandoEuDigitoNoInput}
        />
        <Button onClick={quandoClicaNoBotao}>Adicionar Tarefa</Button>

        <List>
          {tarefas.map((item, index) => (
            <Item key={index}>
              {item}
              <Button onClick={() => removerTarefa(index)}>🗑️</Button>
            </Item>
          ))}
        </List>
      </TodoList>
    </Container>
  );
}

export default App;
