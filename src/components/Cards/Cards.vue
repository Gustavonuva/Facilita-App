<template>
  <div class="containerCard">
    <div v-for="(task, index) in filteredTasks" :key="index" class="box">
      <input
        type="checkbox"
        :id="'checkbox' + task.id"
        class="checkbox"
        v-model="task.checked"
        @change="handleCheckboxChange(task)"
      />
      <label :for="'checkbox' + task.id" class="custom-checkbox">
        <span class="checkmark">✓</span>
      </label>
      <div
        class="task-details"
        :style="{ 'text-decoration': task.checked ? 'line-through' : 'none' }"
      >
        <p>{{ task.title }}</p>
      </div>
      <div :class="['chip-container', getChipColorClass(task.state)]">
        <div :class="['chip ', getChipColorClass(task.state)]">
          <span>{{
            getFormattedState(task.checked ? task.originalState : task.state)
          }}</span>
        </div>
      </div>
      <div class="opcoes" @click="toggleOptionsMenu(task, $event)" ref="menu">
        <i class="fa-solid fa-ellipsis-vertical"></i>
        <div
          v-if="selectedTask === task"
          class="opcoes-menu"
          :style="menuStyle"
          @click.self="closeMenuOnClickOutside"
        >
          <button @click.stop="editTask" class="menu-button edit-button">
            Editar
          </button>
          <button
            @click.stop="deleteTask(selectedTask)"
            class="menu-button delete-button"
          >
            Excluir
          </button>
        </div>
      </div>
      <div class="overlay" v-if="task.checked"></div>
      <ModalList
        v-show="modalOpen"
        :closeModal="closeModal"
        @save-task="addTask"
        :tasks="tasks"
        :editTask="selectedTask"
      />
      <div v-if="showDeleteModal" class="modal">
        <div class="modal-content">
          <img
            src="../../assets/images/lixeira.png"
            alt=""
            class="trash-icon"
          />
          <p>Tem certeza de que deseja excluir esta tarefa?</p>
          <div class="botoesExc">
            <button @click="cancelDelete" class="cancel-button">
              Cancelar
            </button>
            <button @click="confirmDelete" class="confirm-button">
              Confirmar
            </button>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import ModalList from "../Modal/Modal.vue";

export default {
  name: "CardsToDo",
  props: {
    searchText: String,
    selectedCategory: String,
  },

  components: {
    ModalList,
  },

  data() {
    return {
      tasks: [],
      defaultState: "outros",
      selectedTask: null,
      menuStyle: { top: 0, left: 0 },
      modalOpen: false,
      menuOpen: false,
      showDeleteModal: false,
      taskToDelete: null,
    };
  },

  created() {
    this.tasks = this.getTasksFromLocalStorage();
    console.log("Selected Category:", this.selectedCategory);
  },

  computed: {
    filteredTasks() {
      const searchTerm = this.searchText.toLowerCase().trim();

      let filtered = this.tasks;

      if (this.selectedCategory === "todas") {
        return filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );
      } else if (this.selectedCategory === "outros") {
        return filtered.filter((task) => !task.state);
      } else {
        return filtered.filter(
          (task) =>
            task.state === this.selectedCategory &&
            (task.title.toLowerCase().includes(searchTerm) ||
              task.description.toLowerCase().includes(searchTerm))
        );
      }
    },
    getSortedTasks() {
      const priorityOrder = { urgente: 0, importante: 1, outros: 2 };

      return this.filteredTasks.slice().sort((a, b) => {
        const priorityA =
          priorityOrder[a.state] !== undefined ? priorityOrder[a.state] : 2;
        const priorityB =
          priorityOrder[b.state] !== undefined ? priorityOrder[b.state] : 2;

        return priorityA - priorityB;
      });
    },
  },
  mounted() {
    document.addEventListener("click", this.closeMenuOnClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.closeMenuOnClickOutside);
  },

  methods: {
    addToTasks(newTask) {
      this.tasks.push(newTask);
    },
    toggleOptionsMenu(task, event) {
      if (this.selectedTask === task) {
        this.selectedTask = null;
        this.menuOpen = false;
      } else {
        this.selectedTask = task;
        this.menuStyle = {
          top: `${event.clientY}px`,
          left: `${event.clientX}px`,
        };
        this.menuOpen = true;
      }
    },
    handleCheckboxChange(task) {
      if (task.checked) {
        task.originalState = task.state;
        task.state = "finalizado";
        this.updateTaskInLocalStorage(task);
        this.$emit("taskCompleted");
        window.location.reload();
      }
    },
    editTask() {
      this.modalOpen = true;
      this.menuOpen = false; 
    },
    closeModal() {
      this.modalOpen = false;
    },
    deleteTask(task) {
      this.taskToDelete = task;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      this.tasks = this.tasks.filter((t) => t.id !== this.taskToDelete.id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.selectedTask = null;

      this.showDeleteModal = false;

      window.location.reload();
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.taskToDelete = null;
    },
    updateTaskInLocalStorage(updatedTask) {
      const tasks = this.getTasksFromLocalStorage();
      const updatedTasks = tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
    getFormattedState(state) {
      const stateMap = {
        urgente: "Urgente",
        importante: "Importante",
        finalizado: "Finalizado",
      };
      return stateMap[state] || state;
    },
    getChipColorClass(state) {
      const colorMap = {
        Urgente: "urgente",
        Importante: "importante",
        Finalizado: "finalizado",
      };
      return colorMap[this.getFormattedState(state)] || "default-color";
    },
    getTasksFromLocalStorage() {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    },
    closeMenuOnClickOutside(event) {
      
      if (this.$el && !this.$el.contains(event.target)) {
        this.selectedTask = null;
        this.menuOpen = false;
      }
    },
    getPriorityOrder(task) {
      const priorityOrder = { urgente: 0, importante: 1, outros: 2 };
      return priorityOrder[task.state] || 2;
    },
  },
};
</script>

<style scoped lang="stylus">
@import './styles.styl';
</style>
