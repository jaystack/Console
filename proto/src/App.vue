<template>
  <div id="app">
    <nav class="navbar is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            CONSOLE_
          </router-link>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div class="navbar-menu">
          <div class="navbar-search">
            <b-field>
              <b-input
                placeholder="Search..."
                type="search"
                icon="magnify"
                v-model="localSearch"
              >
              </b-input>
            </b-field>
          </div>
          <div class="navbar-end">
            <router-link to="/" class="navbar-item">
              <b-icon
                      icon="view-dashboard"
                      size="is-small">
              </b-icon>
            </router-link>
            <router-link to="/dashboard" class="navbar-item">
              <b-icon
                      icon="settings"
                      size="is-small">
              </b-icon>
            </router-link>
            <b-dropdown position="is-bottom-left">
              <a class="navbar-item" slot="trigger">
                <b-icon
                        icon="account"
                        size="is-small">
                </b-icon>
              </a>

              <b-dropdown-item>
                One
              </b-dropdown-item>
              <b-dropdown-item>
                Two
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>
    <div class="navbar-offset">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
    </div>
  </div>
</template>

<style lang="scss">
mark {
  background: #7957d5;
  color: white;
  border-radius: 2px;
  padding: 0 3px;
}
.navbar {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  .navbar-brand {
    .navbar-item {
      font-family: monospace;
      letter-spacing: 2.5px;
      font-weight: bold;
    }
  }
  .navbar-search {
    display: flex;
    align-items: center;
    padding: 0 1em;
    flex: 1 1 auto;
    width: 100%;
    .field {
      width: 100%;
    }
  }
  .navbar-item {
    &:hover {
      background-color: transparent;
    }
  }
}
.navbar-offset {
  padding-top: 52px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    localSearch: null
  }),
  methods: {
    ...mapActions({
      setSearch: "feed/setSearch"
    })
  },
  watch: {
    localSearch(newValue) {
      this.setSearch(newValue);
    }
  }
};
</script>
