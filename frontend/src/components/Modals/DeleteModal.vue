<template>
    <div class="bg-modal">
        <div class="modal">
            <h4>Etes vous sur de vouloir supprimer cet utilisateur?</h4>
            <div>
                <button @click="deleteUser(userId)">Supprimer</button>
                <button @click="closeModal">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DeleteModal",

    props: ["userId", "truc"],

    methods: {
        deleteUser() {
            this.$emit("deleteUser");
        },
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style lang="scss">
.bg-modal {
    position: fixed;
    display: grid;
    place-items: center;
    // background: rgba(59, 59, 59, 0.212);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal {
    position: absolute;
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
}
</style>
