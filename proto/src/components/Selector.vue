<!--<template>-->
    <!--<select ref="select">-->
        <!--<option v-for="option in options" :value="option[label]" :key="option[label]"></option>-->
    <!--</select>-->
<!--</template>-->
<!--<script>-->
<!--import Choices from "choices.js";-->
<!--// import "choices.js/assets/styles/scss/base.scss";-->
<!--import "choices.js/assets/styles/scss/choices.scss";-->
<!--export default {-->
  <!--data: () => ({-->
    <!--choices: null-->
  <!--}),-->
  <!--props: {-->
    <!--options: {-->
      <!--required: true-->
    <!--},-->
    <!--label: {-->
      <!--required: true-->
    <!--}-->
  <!--},-->
  <!--mounted() {-->
    <!--this.choices = new Choices(this.$refs.select);-->
  <!--}-->
<!--};-->
<!--</script>-->
<template>
    <div :class="classes">
        <b-dropdown v-model="choice">
            <button class="button is-primary" slot="trigger">
                <span>{{ choice ? choice : placeholder }}</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item
                v-for="option in options"
                :key="option[label]"
                :value="option[label]"
            >
                {{ option[label] }}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<style lang="scss">
.custom-select.is-expanded {
  .dropdown {
    width: 100%;
    .button,
    .dropdown-trigger {
      width: 100%;
      .icon {
        margin-left: auto;
      }
    }
  }
  .dropdown-menu {
    right: 0;
  }
}
</style>
<script>
export default {
  data: () => ({
    choice: null
  }),
  props: {
    options: {
      required: true
    },
    label: {
      required: true
    },
    placeholder: {
      required: false,
      default: "Choose an Option..."
    },
    expanded: {
      type: Boolean
    }
  },
  computed: {
    classes() {
      return ["custom-select", this.expanded ? "is-expanded" : ""];
    }
  }
};
</script>
