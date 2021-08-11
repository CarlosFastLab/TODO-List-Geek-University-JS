// 1) Referenciar input
let input = document.querySelector('input[name=tarefa]');

// 2) Referenciar button
let btn = document.querySelector('#botao');

// 3) Referenciar a lista
let lista = document.querySelector('#lista');

// card
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas() {
    // Limpar a listagem de itens antes de renderizar novamente
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        // Criar o item da lista
        let itemLista = document.createElement('li');

        // Adicionar classe ao item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // Adicionar evento de click no item da lista
        itemLista.onclick = function () {
            deletarTarefa(this);
        }

        // Criar texto das listas
        let itemTexto = document.createTextNode(tarefa);

        // Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // Adicionar o item da lista na lista (ul)
        lista.appendChild(itemLista);
    }
}

// Executando função para renderizar tarefas
renderizarTarefas();

// 1) Escutar o evento de click no botão
btn.onclick = function () {
    // 2) Capturar valor digitado pelo usuário no input
    let novaTarefa = input.value;

    if (novaTarefa !== '') {
        // 3) Atualizar nova tarefa na lista (array) e 
        tarefas.push(novaTarefa);

        // Renderizar a tela novamente
        renderizarTarefas();

        // Limpando o input value
        input.value = '';

        // Limpando mensagens de erro (spans)
        removerSpans();

        // Salvar no localStorage
        salvarDadosNoStorage();
    } else {
        // Limpando mensagens de erro (spans)
        removerSpans();

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');
        let msg = document.createTextNode('Você precisa informar a tarefa');
        span.appendChild(msg);
        card.appendChild(span);
    }
}

function removerSpans() {
    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tarefa) {
    // Remover tarefa do array
    tarefas.splice(tarefas.indexOf(tarefa.textContent), 1);

    // Renderizar novamente a tela
    renderizarTarefas();

    // Salvar no localStorage
    salvarDadosNoStorage();
}

function salvarDadosNoStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}