<template>
    <div>
        <div class="columns" style="margin-top:0!important;">
            <div class="column is-one-fifth" style="border-right: 1px solid rgba(10,10,10,.05);padding-top:1em;">
                <div v-sticky="{zIndex:10,stickyTop:68,enabled:true}" > <!-- STICKY WRAPPER -->
                    <label class="label">Filters</label>
                    <div class="box">
                    <b-field label="Projects" class="long-dropdown">
                        <b-dropdown v-model="project">
                            <button
                                    :class="'button is-fluid' + (filterSelections.project ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>
                                    {{ filterSelections.project ? filterSelections.project : 'Projects' }}
                                </span>
                                <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item
                                    v-for="filter in filters.project"
                                    :key="filter"
                                    :value="filter"
                            >
                                {{ filter }}
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-field>
                    <b-field label="Clients" class="long-dropdown">
                        <b-dropdown v-model="client">
                            <button
                                    :class="'button is-fluid' + (filterSelections.client ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>{{ filterSelections.client ? filterSelections.client : 'Clients' }}</span>
                                <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item
                                    v-for="filter in filters.client"
                                    :key="filter"
                                    :value="filter"
                            >
                                {{ filter }}
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-field>
                    <b-field label="Contacts" class="long-dropdown">
                        <b-dropdown v-model="contact">
                            <button
                                    :class="'button is-fluid' + (filterSelections.contact ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>{{ filterSelections.contact ? filterSelections.contact : 'Contacts' }}</span>
                                <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item
                                    v-for="filter in filters.contact"
                                    :key="filter"
                                    :value="filter"
                            >
                                {{ filter }}
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-field>
                        <hr class="divider">
                        <button
                                class="button"
                                @click="clearFilters"
                        >
                            <b-icon icon="eraser is-small"></b-icon>
                            <span>Reset Filters</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="column" style="min-height:calc(100% - 52px)">
                <slot></slot>
            </div>
            <div class="column is-one-fifth" style="border-left: 1px solid rgba(10,10,10,.05);">
                <div v-sticky="{zIndex:10,stickyTop:68,enabled:true}">
                    <label class="label">Include</label>

                    <div class="box">
                    <div class="field">
                        <b-checkbox
                            v-model="tech"
                            native-value="slack"
                        >
                            Slack
                        </b-checkbox>
                    </div>

                    <div class="field">
                        <b-checkbox
                            v-model="tech"
                            native-value="email"
                        >
                            Email
                        </b-checkbox>
                    </div>

                    <div class="field">
                        <b-checkbox
                            v-model="tech"
                            native-value="files"
                        >
                            Files
                        </b-checkbox>
                    </div>

                    <div class="field">
                        <b-checkbox
                            v-model="tech"
                            native-value="git"
                        >
                            GIT
                        </b-checkbox>
                    </div>

                        <hr class="divider">
                        <button class="button">
                            <b-icon icon="plus is-small"></b-icon>
                            <span>Add More</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.margin-top {
  margin-top: 2em;
}
.box {
  hr {
    margin: 1rem -1.25rem;
  }
}
.long-dropdown {
  .dropdown,
  .dropdown-trigger {
    width: 100%;
    button,
    .button {
      width: 100%;
      .icon:last-child {
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
import VueSticky from "vue-sticky";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainUI",
  data: () => ({
    client: null,
    project: null,
    contact: null,
    tech: [],
    tags: [],
    filteredTags: [],
    totalTags: [
      "Tag One",
      "Tag Two",
      "Tag Three",
      "Tag Four",
      "Tag Five",
      "Tag Six",
      "Tag Seven",
      "Tag Eight"
    ]
  }),
  methods: {
    ...mapActions({
      updateFilter: "feed/updateFilter",
      clearFilters: "feed/clearFilters"
    }),
  },
  directives: {
    sticky: VueSticky
  },
  computed: {
    ...mapGetters({
      filters: "feed/getFilters",
      filterSelections: "feed/getFilterSelections"
    })
  },
  watch: {
    project(value) {
      this.updateFilter({ filter: "project", value });
    },
    client(value) {
      this.updateFilter({ filter: "client", value });
    },
    contact(value) {
      this.updateFilter({ filter: "contact", value });
    }
  }
};
</script>
