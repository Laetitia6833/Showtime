<template>
    <div>
        <div class="search">
            <div class="search_bar">
                <input class="input-text" v-model="result" />
            </div>

            <button @click="search" class="input-rechercher">Rechercher</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
export default {
    name: "Searchbar",

    data() {
        return {
            result: "",
        };
    },

    methods: {
        search() {
            // this.$store.dispatch("getSearchConcerts", this.result);
            this.$router.push({
                name: "Concerts",
                query: { search: this.result },
            });
        },
    },
};
</script>

<style lang="scss">
.search {
    /* display: flex; */
    /* justify-content: center; */
    width: 80%;
    max-width: 500px;
    margin: auto;
    margin-top: 50px;

    button {
        width: 100%;
        color: white;
        font-size: 20px;
        padding: 5px;
        height: 35px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background: lightgray;
            color: black;
            border: none;
        }
    }
}

.search_bar {
    width: 100%;
}

.search_bar input {
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid black;
    height: 35px;
}
.select {
    width: 100%;
}
.select select {
    display: block;
    width: 100%;
    padding: 5px;
    height: 35px;
    border: none;
}

.input-rechercher {
    background: black;
    font-size: 16px;
    padding: 5px;
}
.input-text {
    width: 250px;
    border: black solid 1px;
}
</style>
