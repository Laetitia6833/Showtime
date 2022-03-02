<template>
    <div>
        <Navbar />
        <div class="title">
            <h1>Résultat de votre recherche</h1>
        </div>
        <transition name="slide">
            <unauthorized-modal
                v-if="error"
                :message="error"
                @closeError="closeError"
            />
        </transition>
        <transition name="slide">
            <success-modal
                v-if="successMessage"
                :successMessage="successMessage"
                @closeSuccess="closeSuccess"
            />
        </transition>

        <CardConcert
            v-for="concert in concerts"
            :key="concert._id"
            :concert="concert"
            @error="getMessage"
            @success="getSuccessMessage"
        />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import CardConcert from "@/components/CardConcert.vue";
import UnauthorizedModal from "../components/Modals/UnauthorizedModal.vue";
import SuccessModal from "../components/Modals/SuccessModal.vue";

import { server } from "../helper";
import axios from "axios";
import CardConcert from "../components/CardConcert.vue";

export default {
    name: "Concerts",
    components: {
        Navbar,
        UnauthorizedModal,
        SuccessModal,
        CardConcert,
    },

    data() {
        return {
            // concerts: {},
            error: "",
            successMessage: "",
        };
    },

    mounted() {
        // axios.get(`${server.baseURL}/concerts`).then((res) => {
        //     this.concerts = res.data;
        // });
        this.$store.dispatch("getSearchConcerts", this.$route.query.search);
    },

    computed: {
        concerts() {
            return this.$store.state.searchResults;
        },
    },

    methods: {
        getMessage(value) {
            this.error = value;
        },
        getSuccessMessage(value) {
            this.successMessage = value;
        },
        closeError() {
            this.error = "";
        },
        closeSuccess() {
            this.successMessage = "";
        },
    },
};
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 20px;
    margin: 40px;
}
</style>
