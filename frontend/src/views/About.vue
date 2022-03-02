<template>
  <div class="home">
    <Navbar />
    <div class="title">
      <h1>About</h1>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "About",
  components: {
    Navbar,
  },
};
</script>
<style scoped>
.home {
  opacity: 0.9;
}
</style>
