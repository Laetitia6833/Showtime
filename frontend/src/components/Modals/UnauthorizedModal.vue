<template>
    <div class="modal__error">
        <button @click="close" class="btn__close">X</button>
        <div class="body">
            <div class="message">
                {{ message }}
            </div>
            <div class="buttons">
                <router-link class="btn__link" to="/register">
                    Créer un compte
                </router-link>
                <router-link class="btn__link" to="/login">
                    Se Connecter
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UnauthorizedModal",

    props: ["message"],

    methods: {
        close() {
            this.$emit("closeError");
        },
    },
};
</script>


<style lang="scss">
.modal__error {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 50px;
    background: rgba(255, 255, 255, 0.87);

    .btn__close {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
        cursor: pointer;
        border: none;
        background: #000;
        color: white;
        padding: 5px 10px;
    }
    .body {
        max-width: 500px;
        text-align: center;
        margin: 20px auto;

        .message {
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .buttons {
            .btn__link {
                display: inline-block;
                width: max-content;
                margin: 5px;
                padding: 10px 0;
                min-width: 200px;
                border: none;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                background: rgb(96, 130, 224);
                border: 2px solid hsl(224, 67%, 63%);
                color: white;
                font-size: 14px;
                transition: all 0.3s;

                &:nth-child(1) {
                    border: 2px solid hsl(123, 75%, 43%);
                    background: rgb(28, 192, 36);

                    &:hover {
                        background: hsla(123, 75%, 43%, 0.281);
                        color: rgb(20, 138, 26);
                    }
                }

                &:hover {
                    background: hsla(224, 84%, 25%, 0.212);
                    color: rgb(57, 89, 179);
                }
            }
        }
    }
}
</style>
