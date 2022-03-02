<template>
    <nav class="navbar">
        <div class="navbar_left">
            <router-link class="link link--primary" to="/">Home</router-link>
        </div>
        <!-- IF USER IS CONNECTED -->
        <div
            v-if="this.$store.state.authenticated === 'user'"
            class="navbar_right"
        >
            <router-link
                class="link link--primary"
                :to="{
                    path: `/user/${this.$store.state.user.id}`,
                }"
            >
                Profil
            </router-link>
            <div @click="logout" class="link link--primary" to="/register">
                Se déconnecter
            </div>
        </div>
        <!-- IF ADMIN IS CONNECTED -->
        <div
            v-else-if="this.$store.state.authenticated === 'admin'"
            class="navbar_right"
        >
            <router-link class="link link--primary" to="/admin">
                Dashboard
            </router-link>
            <div class="link link--primary" to="/register" @click="logout">
                Se déconnecter
            </div>
        </div>
        <!-- NOT CONNECTED -->
        <div v-else class="navbar_right">
            <router-link class="link link--primary" to="/login">
                Se Connecter
            </router-link>
            <router-link class="link link--primary" to="/register">
                S'inscrire
            </router-link>
        </div>
    </nav>
</template>

<script>
import axios from "axios";
import { server } from "../helper";

export default {
    name: "Navbar",

    methods: {
        logout() {
            axios
                .get(`${server.baseURL}/auth/logout`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                })
                .then((res) => {
                    this.$store.commit("SET_AUTHENTICATION", false);
                    this.$store.commit("SET_USER", {});
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    this.$router.push("/");
                });
        },
    },
};
</script>
<style scoped>
.navbar {
    background: black;
    display: flex;
    justify-content: space-between;
}
.navbar_left {
    height: 60px;
}
.navbar_right {
    display: flex;
    justify-content: end;
}
.link {
    height: 100%;
    align-items: center;
    display: flex;
    padding: 0 40px;
    cursor: pointer;
    background: black;
    color: white;
}
.link:hover {
    background: white;
    color: black;
}
</style>
