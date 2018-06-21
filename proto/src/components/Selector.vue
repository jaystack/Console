<template>
    <select ref="select">
        <option v-for="option in options" :value="option[label]" :key="option[label]"></option>
    </select>
</template>
<script>
import Choices from "choices.js";
// import "choices.js/assets/styles/scss/base.scss";
import "choices.js/assets/styles/scss/choices.scss";
export default {
  data: () => ({
    choices: null
  }),
  props: {
    options: {
      required: true
    },
    label: {
      required: true
    }
  },
  mounted() {
    this.choices = new Choices(this.$refs.select);
  }
};
</script>
