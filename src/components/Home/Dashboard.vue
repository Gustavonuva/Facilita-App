<template>
  <div class="container">
    <div class="content">
      <h2>Minhas Tarefas</h2>
      <p class="textDecoration">
        Olá <span>Gustavo Vaz Nunes,</span> você tem
        <span>{{ calculatedTaskCount }} tarefa{{ calculatedTaskCount !== 1 ? "s" : "" }}</span>
        pendente{{ calculatedTaskCount !== 1 ? "s" : "" }}.
      </p>
      <div class="search-box">
        <input
          type="text"
          class="search-text"
          placeholder="Buscar Tarefas"
          v-model="searchText"
        />
      </div>
      <CardToDo :searchText="searchText" :selectedCategory="selectedCategory" @taskCompleted="updateTaskCount" />
    </div>
  </div>
</template>

<script>
import CardToDo from "@/components/Cards/Cards.vue";

export default {
  name: "MyDashboard",
  data() {
    return {
      searchText: "",
      calculatedTaskCount: 0,
    };
  },
  props: {
    selectedCategory: String,
  },
  computed: {
    taskCount() {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks).length : 0;
    },
  },
  methods: {
    updateTaskCount() {
      this.calculatedTaskCount = this.getTaskCountFromLocalStorage();
    },
    getTaskCountFromLocalStorage() {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks).filter(task => !task.checked).length : 0;
    },
    addToTasks(newTask) {
      this.tasks.push(newTask);
      this.updateTaskCount(); // Corrigido para chamar usando "this"
    },
  },
  components: {
    CardToDo,
  },
};
</script>

<style lang="stylus" scoped>
@import './styles.styl';
</style>
