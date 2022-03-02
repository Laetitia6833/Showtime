<template>
    <div class="card__concert">
        <button class="delete__btn" @click="deleteFromFavourite(concert._id)">
            X
        </button>
        <header>
            <h4>{{ concert.nameGroup }}</h4>
            <p>{{ concert.eventName }}</p>
        </header>
        <div class="content">
            <div>
                <p>Ville: {{ concert.eventLoc }}</p>
                <p>date: {{ concert.eventDate }}</p>
            </div>
            <p>prix: {{ concert.price }}€</p>

            <div class="link">
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
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
export default {
    props: ["concert"],

    data() {
        return {
            sucess: "",
        };
    },

    methods: {
        deleteFromFavourite(concertId) {
            console.log(concertId);
            axios
                .patch(
                    `${server.baseURL}/user/deleteFromFavourite/${this.$store.state.user.id}`,
                    { id: concertId },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    this.$store.dispatch("getConcertsByUsers");
                    this.$emit("success", res.data);
                    setTimeout(() => this.$emit("success", ""), 2000);
                });
        },
    },
};
</script>

<style lang="scss">
.card__concert {
    border: 1px solid black;
    width: 300px;
    padding: 10px;
    position: relative;

    header {
        margin-bottom: 20px;
        h4 {
            font-size: 20px;
        }
    }

    .delete__btn {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        border: none;
        border-radius: 999px;
        height: 20px;
        width: 20px;
        color: rgb(136, 1, 1);
        background: rgb(253, 98, 98);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            transform: translate(50%, -50%) scale(1.2);
        }
    }

    .content {
        & > div {
            display: flex;
            justify-content: space-between;
        }
    }

    .link {
        width: max-content;
        margin: 20px auto;

        a {
            border: 1px solid black;
            padding: 10px;
            transition: all 0.3s;

            &:hover {
                padding: 10px 15px;
            }
        }
    }
}
</style>
