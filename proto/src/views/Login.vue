<template>
  <MinimalUi>
    <div class="box" style="min-width:400px;">

      <h2 class="subtitle">Login</h2>

      <hr class="divider">

      <form @submit.prevent="login(credentials)">

        <b-field label="Email">
          <b-input
            v-model="credentials.email"
          ></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="credentials.password"
          ></b-input>
        </b-field>

        <hr class="divider">

        <button class="button is-primary">
          Login
        </button>

      </form>
    </div>
  </MinimalUi>
</template>

<script>
import MinimalUi from "@/layouts/MinimalUi";
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Login",
  data: () => ({
    credentials: {
      email: null,
      password: null,
    }
  }),
  methods: {
    ...mapActions({
      login: 'auth/login'
    })
  },
  components: {
    MinimalUi
  }
};
</script>
