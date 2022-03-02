<template>
    <div>
        <transition name="fade">
            <background-modal
                v-show="bgModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <transition name="slide">
            <delete-modal
                @deleteUser="deleteUser(this.userToDelete)"
                v-show="isModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <transition name="slide">
            <create-user-modal
                v-show="createModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <h1>Les utilisateurs</h1>
        <div>
            <button @click="openCreateModal">Créer un utilisateur</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td data-label="Nom">{{ user.username }}</td>
                    <td data-label="Email">{{ user.email }}</td>
                    <td data-label="Admin">{{ user.admin }}</td>
                    <td data-label="Actions">
                        <router-link
                            :to="{
                                name: 'updateUser',
                                params: { id: user._id },
                            }"
                            :user="user"
                        >
                            Modifier
                        </router-link>
                        <div
                            class="btn btn__delete"
                            @click="openDeleteModal(user._id)"
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
import DeleteModal from "../../components/Modals/DeleteModal.vue";
import BackgroundModal from "../../components/Modals/BackgroundModal.vue";
import CreateUserModal from "../../components/Modals/CreateUserModal.vue";
import axios from "axios";
import { server } from "../../helper";

export default {
    data() {
        return {
            userToDelete: "",
            isModalVisible: false,
            bgModalVisible: false,
            createModalVisible: false,
        };
    },

    components: {
        DeleteModal,
        BackgroundModal,
        CreateUserModal,
    },

    computed: {
        users() {
            // console.log(this.$store.state.users);
            return this.$store.state.users;
        },
    },

    methods: {
        openDeleteModal(userId) {
            this.isModalVisible = true;
            this.bgModalVisible = true;
            this.userToDelete = userId;
        },
        openCreateModal() {
            this.bgModalVisible = true;
            this.createModalVisible = true;
        },
        deleteUser(userId) {
            axios
                .delete(`${server.baseURL}/user/delete/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    this.$store.dispatch("getAllUsers");
                    this.closeModal();
                })
                .catch((e) => console.log(e.response));
        },
        closeModal() {
            this.isModalVisible = false;
            this.bgModalVisible = false;
            this.createModalVisible = false;
            this.userToDelete = "";
        },
    },
};
</script>

<style lang="scss">
.btn {
    cursor: pointer;

    &__delete {
        color: red;
    }
}
table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
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

@media screen and (max-width: 600px) {
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
// SLIDE \\
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
