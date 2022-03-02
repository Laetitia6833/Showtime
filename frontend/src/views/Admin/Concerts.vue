<template>
    <div>
        {{ concertToDelete }}
        <transition name="fade">
            <background-modal
                v-show="bgModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <transition name="slide">
            <delete-modal
                @deleteConcert="deleteConcert(concertToDelete)"
                v-show="isModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <transition name="slide">
            <create-concert-modal
                v-show="createModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <h1 class="concertadmin">Tous les concerts</h1>
        <div class="btn-create">
            <button @click="openCreateModal">Créer un concert</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">Nom du groupe</th>
                    <th scope="col">Nom de l'évènement</th>
                    <th scope="col">Lieu</th>
                    <th scope="col">Date</th>
                    <th scope="col">Style</th>
                    <th scope="col">prix</th>
                    <th scope="col">Image</th>
                    <th scope="col">Nombre de places</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="concert in concerts" :key="concert.id">
                    <td data-label="Nom du groupe">
                        {{ concert.nameGroup }}
                    </td>
                    <td data-label="Nom de l'évènement">
                        {{ concert.eventName }}
                    </td>
                    <td data-label="Lieu">{{ concert.eventLoc }}</td>
                    <td data-label="Date">{{ concert.eventDate }}</td>
                    <td data-label="Style">{{ concert.type }}</td>
                    <td data-label="Prix">{{ concert.price }}</td>
                    <td data-label="Image">
                        <img
                            class="concert-mini"
                            :src="concert.imagepath"
                            alt="concertimage"
                        />
                    </td>
                    <td data-label="Nombre de places">
                        {{ concert.nbticket }}
                    </td>

                    <td data-label="Actions">
                        <router-link
                            :to="{
                                name: 'UpdateConcert',
                                params: { id: concert.id },
                            }"
                            :concert="concert"
                        >
                            Modifier
                        </router-link>
                        <div
                            class="btn btn__delete"
                            @click="openDeleteModal(concert.id)"
                        >
                            Supprimer
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import DeleteModal from "../../components/Modals/DeleteModalC.vue";
import BackgroundModal from "../../components/Modals/BackgroundModal.vue";
import CreateConcertModal from "../../components/Modals/CreateConcertModal.vue";
import axios from "axios";
import { server } from "../../helper";

export default {
    data() {
        return {
            concertToDelete: "",
            isModalVisible: false,
            bgModalVisible: false,
            createModalVisible: false,
        };
    },

    components: {
        DeleteModal,
        BackgroundModal,
        CreateConcertModal,
    },

    computed: {
        concerts() {
            // console.log(this.$store.state.concerts);
            return this.$store.state.concerts;
        },
    },

    methods: {
        openDeleteModal(concertId) {
            console.log(concertId);
            this.isModalVisible = true;
            this.bgModalVisible = true;
            this.concertToDelete = concertId;
        },
        openCreateModal() {
            this.bgModalVisible = true;
            this.createModalVisible = true;
        },
        deleteConcert(concertId) {
            console.log(this.concertToDelete);
            axios
                .delete(`${server.baseURL}/concerts/${concertId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    this.$store.dispatch("getAllConcerts");
                    this.closeModal();
                })
                .catch((e) => console.log(e.response));
        },
        closeModal() {
            this.isModalVisible = false;
            this.bgModalVisible = false;
            this.createModalVisible = false;
            this.concertToDelete = "";
        },
    },
};
</script>

<style lang="scss">
.concert-mini {
    width: 100px;
    display: flex;
    justify-content: center;
}
.btn {
    cursor: pointer;
}
table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
    max-width: 90%;
    margin: auto;
}
.concertadmin {
    margin: 5px;
    font-weight: bold;
    text-decoration: underline;
}
.btn-create {
    display: flex;
    justify-content: center;
    margin: 10px;
}
table caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
}

table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0.35em;
}

table th,
table td {
    padding: 0.625em;
    text-align: center;
}

table th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

@media screen and (max-width: 840px) {
    table {
        border: 0;
    }

    table caption {
        font-size: 1.3em;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: 0.625em;
    }

    table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: 0.8em;
        text-align: right;
    }

    table td::before {
        /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }

    table td:last-child {
        border-bottom: 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.7s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}
</style>

<!-- <template>
  <div>Les concerts</div>
  <p>{{ concerts }}</p>
</template>
<script>
import { server } from "../../helper.js";
import axios from "axios";
export default {
  name: "AdminConcert",
  data() {
    return { concert: {} };
  },
  mounted() {
    axios.get(`${server.baseURL}/concerts`).then((res) => {
      this.concerts = res.data;
      console.log(res.data);
    });
  },
};
</script> -->
