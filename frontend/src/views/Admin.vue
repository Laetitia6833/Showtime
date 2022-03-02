<template>
  <div>
    <navbar />
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Admin",
  components: {
    Navbar,
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },

  mounted() {
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getAllConcerts");
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  /* color: white; */
  margin-bottom: 20px;
}
.connect {
  text-align: center;
  padding: 10px;
  max-width: 400px;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 10px;
  margin: auto;
  margin-top: 20px;
  padding-bottom: 20px;
}
.btn-connect {
  margin: 10px;
}
label {
  color: white;
}
input {
  margin-bottom: 10px;
  margin-top: 5px;
}
.home {
  height: calc(100vh);
  background: center / cover
    url("https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  opacity: 0.9;
}
</style>
