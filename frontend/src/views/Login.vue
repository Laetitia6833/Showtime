<template>
    <div class="home">
        <div>
            <Navbar />
            <div class="connect">
                <div class="title">
                    <h1>Se connecter</h1>
                </div>
                <div v-if="this.errors" class="errors">
                    {{ errors }}
                </div>
                <div>
                    <label for="name">Votre nom d'utilisateur</label><br />
                    <input type="text" name="name" v-model="user.name" />
                </div>
                <div>
                    <label for="password">Votre mot de passe</label><br />
                    <input
                        type="password"
                        name="password"
                        v-model="user.password"
                    />
                </div>
                <div>
                    <button @click="login" class="btn-connect">
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { server } from "../helper";
export default {
    name: "Login",
    components: {
        Navbar,
    },

    data() {
        return {
            user: {
                name: "",
                password: "",
            },
            errors: "",
        };
    },

    methods: {
        login() {
            if (this.user.name === "" || this.user.password === "") {
                this.errors = "Veuillez remplir tous les champs";
                return this.errors;
            }
            axios
                .post(`${server.baseURL}/auth/signin`, {
                    username: this.user.name,
                    password: this.user.password,
                })
                .then((res) => {
                    const token = res.data.accessToken;
                    const admin = res.data.user.admin;
                    let user = {
                        id: res.data.user._id,
                        username: res.data.user.username,
                        admin: admin,
                    };
                    if (res.status == 201) {
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                        if (user.admin) {
                            console.log("is admin");
                            this.$store.commit("SET_AUTHENTICATION", "admin");
                            this.$store.commit("SET_USER", user);
                            this.$router.push({ name: "Admin" });
                            return null;
                        }
                        this.$router.push({ name: "Home" });
                        this.$store.commit("SET_USER", user);
                        this.$store.commit("SET_AUTHENTICATION", "user");
                    }
                })
                .catch((e) => {
                    this.errors = e.response.data.message;
                });
        },
    },
};
</script>
<style scoped>
.errors {
    color: white;
}
.title {
    text-align: center;
    color: white;
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
