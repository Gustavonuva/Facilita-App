<template>
  <div class="navbar">
      <img class="logo" src="@/assets/svg/logo.svg" alt="" />
      <div class="navbar-item">
        <img src="@/assets/svg/dashboard.svg" alt="Dashboard" />
        <router-link to="/">Dashboard</router-link>
      </div>

      <div class="navbar-item">
        <div>
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div>
          <router-link to="/tarefas">Tarefas</router-link>
        </div>
      </div>

      <div class="navbar-item">
        <i class="fa-solid fa-gears"></i>
        <router-link to="/configuracoes">Configurações</router-link>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "NavbarOptions",
};
</script>

<style lang="stylus" scoped>
@import './styles.styl';
</style>
