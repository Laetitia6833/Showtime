<template>
    <div>
        <div class="success" v-if="this.success">
            <p>{{ this.success }}</p>
        </div>

        <!-- <navbar /> -->
        <h1>Profile</h1>
        <p>Bonjour {{ user.username }}</p>
        <router-link
            :to="{ path: `/user/${$route.params.id}/update` }"
            :user="user"
        >
            Modifier mes informations
        </router-link>
        <h2>Mes concerts favoris</h2>
        <div class="card__container">
            <card-concert
                v-for="concert in concerts"
                :key="concert.id"
                :concert="concert"
                @success="getMessage"
            />
        </div>
        <div>
            <!-- <div class="concert" v-for="concert in concerts" :key="concert.id">
                <h5>group name: {{ concert.nameGroup }}</h5>
                <p>event name: {{ concert.eventName }}</p>
            </div> -->
        </div>
    </div>
</template>

<script>
import CardConcert from "../components/CardConcertProfil.vue";

export default {
    data() {
        return {
            success: "",
        };
    },

    components: {
        CardConcert,
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
        concerts() {
            return this.$store.state.userConcerts;
        },
    },

    mounted() {
        // axios
        //     .get(`${server.baseURL}/user/concerts/${this.$store.state.user.id}`)
        //     .then((res) => {
        //         this.concerts = res.data;
        //     });
        this.$store.dispatch("getConcertsByUsers");
    },

    methods: {
        getMessage(value) {
            this.success = value;
        },
    },
};
</script>

<style lang="scss">
.concert {
    margin-top: 20px;
    border: 1px solid black;
}

.success {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(243, 66, 66, 0.726);
    height: 50px;
    display: grid;
    place-items: center;
    color: white;
    letter-spacing: 1px;
}

.card__container {
    gap: 15px;
    justify-content: center;
    max-width: 90%;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
}
</style>
