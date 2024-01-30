<template>
  <div id="app">
    <NavbarOptions />
    <div class="container">
      <TopBar />

      <router-view />
      <button class="add-button" type="button" @click.stop="openModal">
        +
      </button>
      <Modal
        v-if="modalOpen"
        :closeModal="closeModal"
        @save-task="addTask"
        :tasks="tasks"
      />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/TopBar.vue";
import NavbarOptions from "@/components/Navbar/NavbarOptions.vue";
import Modal from "./components/Modal/Modal.vue";

export default {
  name: "App",
  components: { NavbarOptions, TopBar, Modal },

  data() {
    return {
      modalOpen: false,
      activeModal: null,
      tasks: [],
    };
  },

  methods: {
    openModal() {
      this.modalOpen = true;

      this.activeModal = "dashboard";
    },
    closeModal() {
      this.modalOpen = false;
      this.activeModal = null;
    },
    addTask(newTask) {
      this.tasks.push(newTask);
    },
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  width: 100%;
}

.container {
  flex-grow: 1;
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #1ad18f;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.3s;
}

.add-button:hover {
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #159f6d;
}
</style>
