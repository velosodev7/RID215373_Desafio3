document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create-todo-form");
  const todoList = document.getElementById("todo-list");
  const contadorTarefas = document.getElementById("contador-tarefas");

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
                ${
                  isCompleted
                    ? `    <div class="complete-btn-svg"><svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16.5" r="16" fill="#00D8A7"/>
<path d="M10.6667 17.1666L14 20.5L21.3334 13.1666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>`
                    : '<button type="button" class="complete-btn">Concluir</button>'
                }
            </div>
        `;

    if (!isCompleted) {
      setupTaskButtons(taskItem);
    }
    todoList.appendChild(taskItem);

    if (isCompleted) {
      updateContador();
    }
  }

  function setupTaskButtons(taskItem) {
    const completeBtn = taskItem.querySelector(".complete-btn");
    completeBtn.addEventListener("click", function () {
      const description = taskItem.querySelector(".task-description");
      description.classList.add("completed");

      // Substitui o botão pelo SVG de check verde
      const taskActions = taskItem.querySelector(".task-actions");
      taskActions.innerHTML = `
       <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16.5" r="16" fill="#00D8A7"/>
<path d="M10.6667 17.1666L14 20.5L21.3334 13.1666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      `;

      updateContador();
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

    updateContador();
  }

  function updateContador() {
    const tarefasConcluidas = document.querySelectorAll(
      ".task-description.completed"
    ).length;
    contadorTarefas.textContent = `${tarefasConcluidas} tarefa(s) concluída(s)`;
  }
});
