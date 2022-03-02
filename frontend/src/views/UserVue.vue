<template>
    <div>
        <navbar />
        <h1>User profil</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
};
</script>
