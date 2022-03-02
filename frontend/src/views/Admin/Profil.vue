<template>
  <div>
    <div class="title">
      <h1>Profil</h1>
    </div>

    <div>
      <router-link class="route" :to="{ name: 'manageConcerts' }">
        Les concerts
      </router-link>
      <router-link class="route" :to="{ name: 'manageUsers' }">
        Les Utilisateurs
      </router-link>
      <div class="stat">
        <p>
          <strong>{{ allUsersCount }}</strong> utilisateur{{
            allUsersCount > 1 ? "s" : ""
          }}
          inscrits sur le site
        </p>
        <p>
          Vous avez <strong>{{ adminsCount }}</strong> admin{{
            allUsersCount > 1 ? "s" : ""
          }}
          sur le site
        </p>
        <p>
          <strong>{{ usersCount }}</strong> moldu{{
            allUsersCount > 1 ? "s" : ""
          }}
          inscrits sur le site
        </p>
        <p>
          <strong>Vous avez {{ allConcertsCount }}</strong> concerts{{
            allConcersCount > 1 ? "s" : ""
          }}
          en ligne sur le site
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      allUsersCount: "getAllUsersCount",
      adminsCount: "getAdminsCount",
      usersCount: "getUsersCount",
      allConcertsCount: "getAllConcertsCount",
    }),
  },
};
</script>
<style scoped>
.stat {
  margin: 10px;
}
p {
  padding: 5px;
}
.route:hover {
  color: red;
}
</style>
