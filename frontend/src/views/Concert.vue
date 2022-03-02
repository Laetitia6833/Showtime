<template>
    <div class="home">
        <Navbar />
        <div class="title">
            <h1>{{ concert.eventName }}</h1>
        </div>
        <div class="content">
            <div class="info">
                <div class="info-top">
                    <h2>{{ concert.nameGroup }}</h2>
                    <h3>{{ concert.eventDate }}</h3>
                    <h3>{{ concert.price }} euros</h3>
                </div>
                <hr />
                <div class="info-bottom">
                    <h3>Lieu : {{ concert.eventLoc }}</h3>
                    <p>Nombre de places restantes : {{ concert.nbticket }}</p>
                </div>
            </div>
            <div class="image">
                <img
                    class="img-concert"
                    :src="concert.imagepath"
                    alt="image-test"
                />
            </div>
        </div>
        <div class="btn-buy">
            <button
                @click="
                    [() => TogglePopup('buttonTrigger'), buyTicket(concert.id)]
                "
                class="btn-buy-ticket"
            >
                Acheter
            </button>
            <Popup
                v-if="popupTriggers.buttonTrigger"
                :TogglePopup="(buyticket) => TogglePopup('buttonTrigger')"
            >
                <h2>Félicitations !</h2>
                <p>La place est réservée</p>
            </Popup>
            <Popup
                v-if="popupTriggers.timedTrigger"
                :TogglePopup="() => TogglePopup('timedTrigger')"
            >
            </Popup>
        </div>
        <!-- <div class="content2">
      <p>Autres dates et lieux</p>
    </div> -->
    </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import { server } from "../helper";
import axios from "axios";
import Popup from "@/components/Popup.vue";
import { ref } from "vue";
export default {
    name: "Concert",
    components: {
        Navbar,
        // Popup,
    },
    setup() {
        const popupTriggers = ref({
            buttonTrigger: false,
            timedTrigger: false,
        });
        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger];
        };
        setTimeout(() => {
            popupTriggers.value.timedTrigger = true;
        }, 3000);
        return {
            Popup,
            popupTriggers,
            TogglePopup,
        };
    },
    data() {
        return { concert: {} };
    },

    mounted() {
        axios
            .get(`${server.baseURL}/concerts/concert/${this.$route.params.id}`)
            .then((res) => {
                this.concert = res.data;
            });
    },
    methods: {
        buyTicket(concertId) {
            axios
                .post(`${server.baseURL}/concerts/bookTicket/${concertId}`)
                .then((res) => {
                    console.log(res);
                });
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
.content {
    max-width: 800px;
    margin: auto;
    height: 300px;
    background: rgb(230, 224, 224, 0.4);
}
.content2 {
    max-width: 800px;
    margin: auto;
    height: 100px;
    margin-top: 20px;
}
.info {
    float: left;
    width: 50%;
    height: 300px;
}
.image {
    float: right;
    width: 50%;
    height: 300px;
    object-fit: cover;
}
.img-concert {
    height: 300px;
    max-width: 600px;
}
.info-top {
    float: top;
    height: 50%;
    text-align: center;

    padding: 10px;
}
.info-bottom {
    float: bottom;
    height: 50%;
    text-align: center;

    padding: 10px;
}
.btn-buy {
    display: flex;
    justify-content: center;
    margin: 10px;
}
.btn-buy-ticket {
    background: black;
    color: white;
    font-size: 20px;
    padding: 15px;
    border-radius: 20px;
}
.btn-buy-ticket:hover {
    background: white;
    color: black;
    transition: all 0.5s;
}
h1 {
    font-weight: bold;
    text-decoration: underline;
}
h2 {
    font-weight: bold;
    font-size: 18px;
    margin: 10px;
}
h3 {
    font-size: 16px;
    margin: 10px;
}

popup {
    margin-left: 20px;
    background: rgb(122, 190, 122, 0.5);
}
hr {
    border: 1px solid black;
    background: black;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
