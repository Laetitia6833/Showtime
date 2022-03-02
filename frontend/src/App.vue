<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.$store.commit("SET_USER", user);
      let admin = user.admin;

      if (admin) {
        this.$store.commit("SET_AUTHENTICATION", "admin");
      } else {
        this.$store.commit("SET_AUTHENTICATION", "user");
      }
      // this.$store.commit('SET_AUTHENTICATION', )
    }
  },
};
</script>

<style src="../css/reset.css"></style>
<style>
#app {
  min-height: 100vh;
}
body {
  font-family: sans-serif;
}

.mt {
  padding-top: 100px;
}
</style>
