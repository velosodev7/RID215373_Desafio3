document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create-todo-form");
  const todoList = document.getElementById("todo-list");
  const contadorTarefas = document.getElementById("contador-tarefas");

  // Verifica se é a primeira execução
  const isFirstRun = !localStorage.getItem("tasks_initialized");

  // Carrega tarefas
  loadTasks(isFirstRun);

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

  function addTask(
    description,
    tag,
    isCompleted = false,
    isInitialLoad = false
  ) {
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
                ${
                  isCompleted
                    ? `
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16.5" r="16" fill="#00D8A7"/>
                    <path d="M10.6667 17.1666L14 20.5L21.3334 13.1666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
                    : '<button type="button" class="complete-btn">Concluir</button>'
                }
            </div>
        `;

    if (!isCompleted) {
      setupTaskButtons(taskItem);
    }
    todoList.appendChild(taskItem);

    // Não salva no localStorage se for carregamento inicial
    if (!isInitialLoad) {
      saveTaskToLocalStorage({
        description,
        tag,
        isCompleted,
        creationDate,
      });
    }

    if (isCompleted) {
      updateContador();
    }
  }

  function setupTaskButtons(taskItem) {
    const completeBtn = taskItem.querySelector(".complete-btn");
    completeBtn.addEventListener("click", function () {
      const description = taskItem.querySelector(".task-description");
      description.classList.add("completed");

      const taskActions = taskItem.querySelector(".task-actions");
      taskActions.innerHTML = `
       <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16.5" r="16" fill="#00D8A7"/>
          <path d="M10.6667 17.1666L14 20.5L21.3334 13.1666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
      `;

      updateTaskInLocalStorage(description.textContent, true);
      updateContador();
    });
  }

  function loadTasks(isFirstRun) {
    // Limpa a lista
    todoList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Se for primeira execução, carrega tarefas padrão
    if (isFirstRun && tasks.length === 0) {
      const defaultTasks = [
        {
          description: "Implementar tela de listagem de tarefas",
          tag: "Frontend",
          isCompleted: false,
          creationDate: new Date().toLocaleDateString("pt-BR"),
        },
        {
          description: "Criar endpoint para cadastro de tarefas",
          tag: "Backend",
          isCompleted: false,
          creationDate: new Date().toLocaleDateString("pt-BR"),
        },
        {
          description: "Implementar protótipo da listagem de tarefas",
          tag: "UX",
          isCompleted: true,
          creationDate: new Date().toLocaleDateString("pt-BR"),
        },
      ];

      tasks = defaultTasks;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("tasks_initialized", "true");
    }

    // Carrega todas as tarefas (padrão ou do localStorage)
    tasks.forEach((task) => {
      addTask(
        task.description,
        task.tag,
        task.isCompleted,
        isFirstRun // Passa como isInitialLoad
      );
    });

    updateContador();
  }

  function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Verifica se a tarefa já existe
    if (
      !tasks.some(
        (t) =>
          t.description === task.description &&
          t.creationDate === task.creationDate
      )
    ) {
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function updateTaskInLocalStorage(description, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(
      (task) => task.description === description
    );

    if (taskIndex !== -1) {
      tasks[taskIndex].isCompleted = isCompleted;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function updateContador() {
    const tarefasConcluidas = document.querySelectorAll(
      ".task-description.completed"
    ).length;
    contadorTarefas.textContent = `${tarefasConcluidas} tarefa(s) concluída(s)`;
  }
});
