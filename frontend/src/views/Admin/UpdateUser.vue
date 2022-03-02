<template>
    <div>
        <h1>Update User</h1>
        <div v-if="this.errors">
            <p v-for="error in this.errors" :key="error.index">
                {{ error }}
            </p>
        </div>
        <div>
            <label for="name">Nom</label>
            <input v-model="user.username" type="text" />
        </div>
        <div>
            <label for="email">Email</label>
            <input v-model="user.email" type="text" />
        </div>
        <div>
            <label for="true">Admin</label>
            <input type="radio" value="true" v-model="user.admin" />
            <br />
            <label for="false">Pas admin</label>
            <input type="radio" value="false" v-model="user.admin" />
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
            user: "",
            errors: {},
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
                    this.$store.dispatch("getAllUsers");
                    this.$router.push("/admin/users");
                })
                .catch((e) => {
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
