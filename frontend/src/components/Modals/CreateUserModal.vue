<template>
  <div class="bg-modal">
    <div class="modal">
      <h4>create user</h4>
      <div>
        <div class="errors" v-if="errors">
          <p v-for="error in this.errors" :key="error.index">
            {{ error }}
          </p>
        </div>
        <div>
          <label for="name">Nom</label>
          <input v-model="user.username" type="text" name="name" />
        </div>
        <div>
          <label for="name">Email</label>
          <input v-model="user.email" type="text" name="email" />
        </div>
        <div>
          <label for="name">Mot de passe</label>
          <input v-model="user.password" type="text" name="password" />
        </div>
        <div>
          <label for="true">Admin</label>
          <input type="radio" value="true" v-model="user.admin" />
          <br />
          <label for="false">Pas admin</label>
          <input type="radio" value="false" v-model="user.admin" />
        </div>
        <button @click="createUser">Enregister</button>
        <button @click="closeModal">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";

export default {
  name: "DeleteModal",

  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: "",
    };
  },

  methods: {
    createUser() {
      axios
        .post(`${server.baseURL}/auth/signup`, this.user)
        .then((res) => {
          this.user = "";
          this.$store.dispatch("getAllUsers");
          this.closeModal();
        })
        .catch((e) => {
          this.errors = e.response.data.message;
        });
    },
    closeModal() {
      this.errors = "";
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss">
.bg-modal {
  position: fixed;
  display: grid;
  place-items: center;
  // background: rgba(59, 59, 59, 0.212);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal {
  position: absolute;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
}
</style>
