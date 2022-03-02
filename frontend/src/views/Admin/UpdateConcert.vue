<template>
    <div>
        <h1>Update Concert</h1>
        <!-- <div v-if="this.errors">
      <p v-for="error in this.errors" :key="error.index">
        {{ error }}
      </p>
    </div> -->
        <div>
            <label for="name">Nom du groupe</label>
            <input v-model="concert.nameGroup" type="text" />
        </div>
        <div>
            <label for="nom">Nom du groupe l'évènement</label>
            <input v-model="concert.eventName" type="text" />
        </div>
        <div>
            <label for="date">Date</label>
            <input v-model="concert.eventDate" type="date" />
        </div>
        <div>
            <label for="type">Style</label>
            <input v-model="concert.type" type="text" />
        </div>
        <div>
            <label for="price">Prix</label>
            <input v-model="concert.price" type="text" />
        </div>
        <div>
            <label for="imagepath">Image</label>
            <input v-model="concert.imagepath" type="text" />
        </div>
        <div>
            <label for="nbticket">Nombre de places</label>
            <input v-model="concert.nbticket" type="text" />
        </div>
        <div>
            <button @click="update">Modifier</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "@/helper";
export default {
    data() {
        return {
            concert: "",
            errors: {},
        };
    },

    methods: {
        update() {
            axios
                .patch(
                    `${server.baseURL}/concerts/${this.$route.params.id}`,

                    this.concert,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    this.$store.dispatch("getAllConcerts");
                    this.$router.push("/admin/concerts");
                })
                .catch((e) => {
                    this.errors = e.response.data.message;
                });
        },
    },

    mounted() {
        axios
            .get(`${server.baseURL}/concerts/${this.$route.params.id}`)
            .then((res) => {
                this.concert = res.data;
            });
    },
};
</script>
