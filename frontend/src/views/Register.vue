<template>
  <div class="home">
    <Navbar />
    <div class="connect">
      <div class="title">
        <h1>Inscription</h1>
      </div>
      <!-- <form method="POST"> -->
      <div>
        <label for="name">Votre nom d'utilisateur</label><br />
        <input type="text" name="name" v-model="user.name" />
      </div>
      <!-- <div>
                <label for="dep">Votre département</label><br />
                <input
                    type="text"
                    name="dep"
                    pattern="[0-9]{5}"
                    title="Le département doit contenir 5 chiffres"
                />
            </div> -->
      <div>
        <label for="email">Votre Email</label><br />
        <input type="text" name="email" v-model="user.email" />
      </div>

      <div>
        <label for="password">Votre mot de passe</label><br />
        <input type="password" name="password" v-model="user.password" />
      </div>

      <div>
        <label for="password_confirmation">Confirmer votre mot de passe</label
        ><br />
        <input
          type="password"
          name="password_confirmation"
          v-model="user.password_confirmation"
        />
      </div>
      <div>
        <button @click="register" class="btn-connect">S'inscrire</button>
      </div>
    </div>

    <!-- </form> -->
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { server } from "../helper";

export default {
  name: "Register",
  components: {
    Navbar,
  },

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  methods: {
    register() {
      console.log("register");
      if (this.user.password !== this.user.password_confirmation) {
        console.log("nope");
        return null;
      }
      let user = {
        username: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      axios
        .post(`${server.baseURL}/auth/signup`, user)
        .then((res) => {
          console.log("hi");
          // localStorage.setItem("user", JSON.stringify(u));
        })
        .catch((e) => {
          // console.log(e.response);
        });
    },
  },
};
</script>
<style scoped>
.home {
  height: calc(100vh);
  background: center / cover
    url("https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  opacity: 0.9;
}
.title {
  text-align: center;
  margin-bottom: 20px;
  color: white;
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
</style>
