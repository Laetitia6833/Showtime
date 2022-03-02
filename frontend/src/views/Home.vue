<template>
  <div class="home">
    <Navbar />

    <div class="title">
      <h1>Spectacles et concerts</h1>
    </div>
    <Searchbar />
    <!-- {{ hello() }} -->
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
// import { server } from "../helper";

import Navbar from "@/components/Navbar.vue";
import Searchbar from "@/components/Searchbar.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    Searchbar,
  },
  mounted() {
    this.$store.dispatch("getAllConcerts");
  },
  // methods: {
  //     hello() {
  //         axios.get(`${server.baseURL}`).then((res) => {
  //             console.log(res);
  //         });
  //     },
  // },
};
</script>
<style scoped>
.home {
  opacity: 0.9;
  height: calc(100vh);
  background: center / cover
    url("https://images.pexels.com/photos/2078071/pexels-photo-2078071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
}
.title {
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bolder;
  margin-top: 30px;
}
.allconcerts {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  height: 30px;
}
.all {
  font-size: 20px;
  font-weight: bold;
}
</style>
