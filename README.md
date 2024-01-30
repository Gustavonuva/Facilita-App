# Facilita App To-Do

## Componente TopBar

O componente `TopBar` é a estrutura principal da aplicação, compreendendo a barra superior (`top-bar`) e o conteúdo principal (`content-container`).

### Estrutura do Template

#### top-bar:

- **profile-picture:** Exibe uma imagem de perfil.
- **topBar-items:** Contém informações do usuário, como nome e função.

#### content-container:

- **CategoriaBar:** Responsável por exibir a barra de categorias, podendo conter opções de filtragem ou visualização de tarefas com base em categorias.

## Componente NavbarOptions

O componente `NavbarOptions` representa a barra de navegação lateral, com links para diferentes seções da aplicação.

### Estrutura do Template

- **Dashboard:** Ícone e link para a página de Dashboard.
- **Tarefas:** Ícone e link para a página de Tarefas.
- **Configurações:** Ícone e link para a página de Configurações.

## Componente ModalList

O componente `ModalList` exibe um modal para adição ou edição de tarefas, com campos como título, descrição e opções de estado (urgente ou importante).

### Dados

- **formTask:** Objeto que armazena dados da tarefa em edição ou criação.
- **radioOptions:** Opções para o campo de rádio (estado da tarefa).
- **radioGroupName:** Nome do grupo de rádio.
- **selectedRadio:** Valor selecionado para o campo de rádio.
- **editMode:** Indica se o modal está no modo de edição.

### Props

- **closeModal:** Função para fechar o modal.
- **editTask:** Objeto da tarefa em modo de edição.

### Métodos Principais

- **saveTask():** Salva uma nova tarefa ou atualiza uma existente.
- **updateTask():** Atualiza a tarefa em modo de edição.

### Watch

- **editTask(newValue):** Atualiza o formulário quando a tarefa em modo de edição é alterada.

## Componente MyDashboard

O componente `MyDashboard` exibe informações sobre tarefas, incluindo um cumprimento personalizado, o número de tarefas pendentes e uma caixa de busca. Utiliza o componente `CardToDo` para renderizar tarefas de acordo com a categoria selecionada.

### Dados

- **searchText:** Texto inserido na caixa de busca.
- **calculatedTaskCount:** Contagem de tarefas pendentes calculada.
- **selectedCategory:** Categoria selecionada.

### Props

- **selectedCategory:** Recebe a categoria selecionada como propriedade.

### Computed

- **taskCount:** Obtém o número total de tarefas armazenadas no localStorage.

### Métodos Principais

- **updateTaskCount():** Atualiza a contagem de tarefas pendentes.
- **getTaskCountFromLocalStorage():** Obtém a contagem de tarefas pendentes do armazenamento local.
- **addToTasks(newTask):** Adiciona uma nova tarefa e atualiza a contagem de tarefas.

## Componente MyCategory

O componente `MyCategory` exibe uma barra de categorias e uma seção de dashboard, permitindo a seleção de categorias e exibindo contadores para categorias específicas. Utiliza o componente `Dashboard` para mostrar informações.

### Dados

- **categories:** Lista de categorias.
- **selectedCategory:** Categoria selecionada.
- **tasks:** Lista de tarefas.

### Métodos Principais

- **selectCategory(category):** Atualiza a categoria selecionada.
- **shouldDisplayCounter(categoryId):** Verifica se o contador deve ser exibido.
- **getCategoryColor(categoryId):** Retorna a cor da categoria.
- **getCategoryTaskCount(categoryId):** Retorna a contagem de tarefas para uma categoria.
- **getTasksFromLocalStorage():** Obtém tarefas do armazenamento local.

### Lifecycle Hooks

- **created():** Inicializa tarefas no localStorage.

## Componente CardsToDo

O componente `CardsToDo` exibe uma lista de tarefas em formato de cartões, oferecendo funcionalidades como marcação de conclusão, opções de edição e exclusão, e filtragem por categoria e pesquisa.

### Propriedades

- **searchText:** String para filtrar tarefas com base no título ou descrição.
- **selectedCategory:** String que representa a categoria selecionada.

### Dados

- **tasks:** Array de tarefas.
- **defaultState:** Estado padrão para tarefas sem categoria.
- **selectedTask, menuStyle, modalOpen, menuOpen, showDeleteModal, taskToDelete:** Controles visuais.

### Métodos Principais

- **addToTasks(newTask):** Adiciona nova tarefa.
- **toggleOptionsMenu(task, event):** Alterna menu de opções.
- **handleCheckboxChange(task):** Manipula alteração de checkbox.
- **editTask():** Abre modal de edição.
- **closeModal():** Fecha modal de edição.
- **deleteTask(task):** Inicia exclusão de tarefa.
- **confirmDelete():** Confirma exclusão.
- **cancelDelete():** Cancela exclusão.
- **updateTaskInLocalStorage(updatedTask):** Atualiza tarefa no localStorage.

### Computed Properties

- **filteredTasks:** Tarefas filtradas com base na categoria e pesquisa.
- **getSortedTasks:** Tarefas ordenadas por prioridade.

### Lifecycle Hooks

- **created():** Inicializa tarefas do localStorage.
- **mounted() e beforeUnmount():** Gerencia eventos para fechar o menu de opções.
