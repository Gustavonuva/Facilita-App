<template>
  <div class="modal-container">
    <div class="modal-bg"></div>
    <div class="modal-list">
      <div class="headerModal">
        <button @click="closeModal">X</button>
      </div>

      <h3>{{ editMode ? "Editar Tarefa" : "Cadastrar Tarefa" }}</h3>

      <div class="form-todo">
        <label for="title">Título:</label>
        <input
          type="text"
          id="title"
          v-model="formTask.title"
          autocomplete="off"
          required
        />
        <label for="description">Descrição:</label>
        <textarea
          id="description"
          v-model="formTask.description"
          cols="50"
          rows="10"
        ></textarea>
        <div class="radioStyle">
          <div
            class="radioCustom"
            v-for="option in radioOptions"
            :key="option.id"
          >
            <input
              type="radio"
              :name="radioGroupName + formTask.id"
              :id="option.id + formTask.id"
              v-model="selectedRadio"
              :value="option.id"
            />
            <label :for="option.id + formTask.id">{{ option.label }}</label>
          </div>
          <div class="buttonAdd">
            <button @click="saveTask">
              {{ editMode ? "Atualizar" : "Salvar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

function shortenUuid(uuid) {
  const base64 = btoa(uuid);
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
export default {
  name: "ModalList",
  props: {
    closeModal: Function,
    editTask: Object,
  },
  data() {
    return {
      formTask: {
        id: shortenUuid(uuidv4()),
        title: "",
        description: "",
        state: null,
      },
      radioOptions: [
        { id: "urgente", label: "Urgente" },
        { id: "importante", label: "Importante" },
      ],
      radioGroupName: "opcao",
      selectedRadio: null,
    };
  },
  computed: {
    editMode() {
      return !!this.editTask;
    },
  },

  watch: {
    editTask(newValue) {
      if (newValue) {
        this.formTask.id = newValue.id || shortenUuid(uuidv4());
        this.formTask.title = newValue.title;
        this.formTask.description = newValue.description;
        this.formTask.state = newValue.state;
        this.selectedRadio = newValue.state;
      } else {
        this.formTask.id = shortenUuid(uuidv4());
        this.formTask.title = "";
        this.formTask.description = "";
        this.formTask.state = null;
        this.selectedRadio = null;
      }
    },
  },
  methods: {
    saveTask() {
      this.formTask.state = this.selectedRadio;
      let tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];

      if (!this.editMode) {
        this.formTask.id = shortenUuid(uuidv4());
      }

      const existingTaskIndex = tasks.findIndex(
        (task) => task.id === this.formTask.id
      );

      if (existingTaskIndex !== -1) {
        tasks[existingTaskIndex] = this.formTask;
      } else {
        tasks.push(this.formTask);
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.closeModal();
      window.location.reload();
    },

    updateTask() {
      this.formTask.state = this.selectedRadio;
      let tasks = JSON.parse(localStorage.getItem("tasks"));

      const index = tasks.findIndex((task) => task.id === this.formTask.id);
      if (index !== -1) {
        tasks[index] = this.formTask;
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));

      this.closeModal();
      window.location.reload();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import './styles.styl';
</style>
