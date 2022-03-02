<template>
    <div>
        <div class="content">
            <div class="info">
                <div class="info-top">
                    <h1>{{ concert.eventName }}</h1>
                    <h3>{{ concert.nameGroup }}</h3>
                    <div>
                        <router-link
                            @click.stop
                            class="show__concert"
                            :to="{
                                name: 'concert',
                                params: { id: concert._id },
                            }"
                        >
                            Voir le Concert
                        </router-link>
                    </div>
                    <!-- <h3>Nombre de places restantes : {{ concert.nbticket }}</h3> -->
                </div>
                <div class="info-bottom">
                    <h3>Date et lieu :</h3>
                    <h3>{{ concert.eventDate }}</h3>
                    <h3>{{ concert.eventLoc }}</h3>
                    <button @click="addToFavorite(concert._id)" class="favori">
                        Ajouter au favoris
                    </button>
                    <!-- <input class="favori" type="submit" value="Informations" /> -->
                </div>
            </div>
            <div class="image">
                <img
                    class="img-concert"
                    :src="concert.imagepath"
                    alt="concertimage"
                />
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { server } from "../helper";

export default {
    name: "CardConcert",

    props: ["concert"],

    data() {
        return {};
    },

    methods: {
        addToFavorite(concertId) {
            // const data = { id: concertId };
            axios
                .put(
                    `${server.baseURL}/user/addToFavourite/${this.$store.state.user.id}`,
                    {
                        id: concertId,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    this.$emit("success", "Concert ajouter à vos favoris");
                    setTimeout(() => this.$emit("success", ""), 2000);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response.status === 401) {
                        this.$emit(
                            "error",
                            "Veuillez vous connecter ou créer un compte pour ajouter des concerts à vos favoris"
                        );
                    }
                });
        },
    },
};
</script>

<style scoped>
.show__concert {
    display: block;
    border: 1px solid #000;
    padding: 10px;
    width: max-content;
    margin: auto;
    transition: all 0.3s;
}
.show__concert:hover {
    padding: 10px 20px;
}
.content {
    max-width: 800px;
    margin: auto;
    height: 250px;

    margin-bottom: 5px;
}

.info {
    float: left;
    width: 50%;
    height: 250px;
    background: lightgray;
}
.image {
    float: right;
    width: 50%;
    height: 250px;
    object-fit: cover;
}
.img-concert {
    height: 250px;
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
.favori {
    margin-top: 10px;
    background: black;
    color: white;
    border-radius: 15px;
}
.favori:hover {
    background: green;
}
h1 {
    margin-bottom: 10px;
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
}
h3 {
    margin-bottom: 5px;
}
</style>
