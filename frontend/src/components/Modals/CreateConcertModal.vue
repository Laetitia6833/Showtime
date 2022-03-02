<template>
  <div class="bg-modal">
    <div class="modal">
      <div class="title">
        <h4>Ajouter un nouveau concert</h4>
      </div>
      <div>
        <div>
          <label for="name">Nom du groupe</label><br />
          <input v-model="concert.nameGroup" type="text" name="name" />
        </div>
        <div>
          <label for="name">Nom de l'évènement</label><br />
          <input v-model="concert.eventName" type="text" name="email" />
        </div>
        <div>
          <label for="name">Lieu</label><br />
          <input v-model="concert.eventLoc" type="text" name="name" />
        </div>
        <div>
          <label for="name">Date</label><br />
          <input v-model="concert.eventDate" type="date" name="email" />
        </div>
        <div>
          <label for="name">Style</label><br />
          <input v-model="concert.type" type="text" name="email" />
        </div>
        <div>
          <label for="name">Prix</label><br />
          <input v-model="concert.price" type="text" name="name" />
        </div>
        <div>
          <label for="name">Image</label><br />
          <input v-model="concert.imagepath" type="text" name="email" />
        </div>
        <div>
          <label for="name">Nombre de places</label><br />
          <input v-model="concert.nbticket" type="text" name="email" />
        </div>
        <button @click="createConcert">Enregister</button>
        <button @click="closeModal">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";

export default {
  name: "DeleteModalC",

  data() {
    return {
      concert: {
        nameGroup: "",
        eventName: "",
        eventLoc: "",
        eventDate: "",
        type: "",
        price: "",
        imagepath: "",
        nbticket: "",
      },
      errors: "",
    };
  },

  methods: {
    createConcert() {
      axios
        .post(`${server.baseURL}/concerts`, this.concert)
        .then((res) => {
          this.$store.dispatch("getAllConcerts");
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
  background: rgba(59, 59, 59, 0.212);
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
.title {
  font-weight: bold;
  margin-bottom: 10px;
}
input {
  margin-bottom: 5px;
}
</style>
