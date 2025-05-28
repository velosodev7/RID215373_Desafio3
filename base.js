document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create-todo-form");
  const todoList = document.getElementById("todo-list");
  const contadorTarefas = document.getElementById("contador-tarefas"); // Novo: elemento do contador

  // Carrega tarefas iniciais
  loadDefaultTasks();

  // Evento para adicionar nova tarefa
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value.trim();
    const tag = document.getElementById("etiqueta").value.trim();

    if (description) {
      addTask(description, tag);
      form.reset();
    }
  });

  function addTask(description, tag, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.className = "todo-item";

    const creationDate = new Date().toLocaleDateString("pt-BR");

    taskItem.innerHTML = `
            <div class="task-content">
                <span class="task-description ${
                  isCompleted ? "completed" : ""
                }">${description}</span>
                <div class="task-meta">
                    ${tag ? `<span class="task-tag">${tag}</span>` : ""}
                    <span class="task-date">Criado em: ${creationDate}</span>
                </div>
            </div>
            <div class="task-actions">
                <button type="button" class="complete-btn">Concluir</button>
            </div>
        `;

    setupTaskButtons(taskItem);
    todoList.appendChild(taskItem);

    // Atualiza o contador após adicionar tarefa (caso isCompleted = true)
    if (isCompleted) {
      updateContador();
    }
  }

  function setupTaskButtons(taskItem) {
    // Evento para concluir tarefa
    taskItem
      .querySelector(".complete-btn")
      .addEventListener("click", function () {
        const description = taskItem.querySelector(".task-description");
        description.classList.toggle("completed");
        updateContador(); // Atualiza o contador quando o status muda
      });
  }

  function loadDefaultTasks() {
    const defaultTasks = [
      {
        description: "Implementar tela de listagem de tarefas",
        tag: "Frontend",
        isCompleted: false,
      },
      {
        description: "Criar endpoint para cadastro de tarefas",
        tag: "Backend",
        isCompleted: false,
      },
      {
        description: "Implementar protótipo da listagem de tarefas",
        tag: "UX",
        isCompleted: true,
      },
    ];

    defaultTasks.forEach((task) => {
      addTask(task.description, task.tag, task.isCompleted);
    });

    // Atualiza o contador após carregar as tarefas iniciais
    updateContador();
  }

  // NOVA FUNÇÃO: Atualiza o contador de tarefas concluídas
  function updateContador() {
    const tarefasConcluidas = document.querySelectorAll(
      ".task-description.completed"
    ).length;
    contadorTarefas.textContent = `${tarefasConcluidas} tarefa(s) concluída(s)`;
  }
});
