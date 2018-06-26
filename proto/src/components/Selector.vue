<template>
    <div :class="classes">
        <b-dropdown v-model="choice">
            <button :class="mainClasses" slot="trigger">
                <span>{{ choice ? choice : placeholder }}</span>
                <b-icon icon="menu-down"></b-icon>
            </button>
            <b-dropdown-item
                v-if="label"
                v-for="option in options"
                :key="option[label]"
                :value="option[label]"
            >
                {{ option[label] }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="!label"
                v-for="option in options"
                :key="option"
                :value="option"
            >
                {{ option }}
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
      required: false,
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
    mainClasses() {
      return ['button', this.choice ? 'is-primary' : ''];
    },
    classes() {
      return ["custom-select", this.expanded ? "is-expanded" : ""];
    }
  }
};
</script>
