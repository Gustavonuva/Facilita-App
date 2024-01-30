<template>
  <div class="container">
    <div class="category-bar">
      <h3 class="header">Categoria</h3>
      <div>
        <div
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
          :class="{ active: selectedCategory === category.id }"
          class="category-item"
        >
          <div class="category-info">
            <span class="category-name">{{ category.name }}</span>
            <div
              v-if="shouldDisplayCounter(category.id)"
              class="category-counter"
            >
              <div
                class="counter-circle"
                :style="{ backgroundColor: getCategoryColor(category.id) }"
              >
                {{ getCategoryTaskCount(category.id) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-container">
      <Dashboard :selectedCategory="selectedCategory" />
    </div>
  </div>
</template>

<script>
import Dashboard from "../Home/Dashboard.vue";
export default {
  name: "MyCategory",

  data() {
    return {
      categories: [
        { id: "todas", name: ">     Todas" },
        { id: "urgente", name: ">     Urgentes" },
        { id: "importante", name: ">     Importantes" },
        { id: "outros", name: ">     Outros" },
        { id: "finalizado", name: ">     Finalizadas" },
      ],
      selectedCategory: "todas",
      tasks: [],
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category.id;
    },
    shouldDisplayCounter(categoryId) {
      return categoryId === "urgente" || categoryId === "importante";
    },
    getCategoryColor(categoryId) {
      switch (categoryId) {
        case "urgente":
          return "#ff2e79";
        case "importante":
          return "#ffc42e";
        default:
          return "transparent";
      }
    },
    getCategoryTaskCount(categoryId) {
      if (categoryId === "todas") {
        return this.tasks.length;
      } else if (categoryId === "finalizado") {
        return this.tasks.filter((task) => task.state === "finalizado").length;
      } else {
        return this.tasks.filter(
          (task) => task.state === categoryId && !task.checked
        ).length;
      }
    },
    getTasksFromLocalStorage() {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    },
  },
  created() {
    this.tasks = this.getTasksFromLocalStorage();
  },
  components: {
    Dashboard,
  },
};
</script>

<style lang="stylus">
@import './stylesCat.styl'
</style>
