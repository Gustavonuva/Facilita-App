<template>
  <div class="main-container">
    <div class="top-bar">
      <div class="profile-picture">
        <img src="../../assets/images/fotoExemp.png" />
      </div>
      <div class="topBar-items">
        <a href="/configuracoes" class="login-option">Gustavo Vaz Nunes</a>
        <p>Front-end developer</p>
      </div>
    </div>
    <div class="content-container">
      <CategoriaBar />
    </div>
  </div>
</template>

<script>
import CategoriaBar from "@/components/CategoriaBar/Categoria.vue";

export default {
  name: "TopBar",
  components: {
    CategoriaBar,
  },
};
</script>

<style lang="stylus" scoped>
@import './styles.styl'
</style>
