<template>
    <div>
        <h1>update Profile</h1>
        <div v-if="this.errors">
            <p v-for="error in this.errors" :key="error.index">
                {{ error }}
            </p>
        </div>
        <div>
            <label for="name">Votre nom</label>
            <input v-model="user.username" type="text" />
        </div>
        <div>
            <label for="email">Votre email</label>
            <input v-model="user.email" type="text" />
        </div>
        <div>
            <button @click="update">Modifier</button>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { server } from "../helper";
export default {
    // props: ["user"],

    data() {
        return {
            user: {},
            errors: false,
        };
    },

    methods: {
        update() {
            axios
                .patch(
                    `${server.baseURL}/user/update/${this.$route.params.id}`,

                    this.user,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    localStorage.setItem("user", JSON.stringify(this.user));
                    this.$router.go(-1);
                })
                .catch((e) => {
                    console.log(e.response);
                    this.errors = e.response.data.message;
                });
        },
    },

    mounted() {
        axios
            .get(`${server.baseURL}/user/user/${this.$route.params.id}`)
            .then((res) => {
                this.user = res.data;
            });
    },
};
</script>
