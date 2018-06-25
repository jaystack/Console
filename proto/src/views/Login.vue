<template>
  <MinimalUi>
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

      <button class="button is-primary">
        Submit
      </button>

    </form>
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
