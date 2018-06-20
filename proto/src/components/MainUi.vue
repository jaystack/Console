<template>
    <div class="margin-top">
        <div class="columns">
            <div class="column is-one-fifth">
                <div v-sticky="{zIndex:10,stickyTop:84,enabled:true}"> <!-- STICKY WRAPPER -->
                    <b-field label="Projects">
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
                    <b-field label="Clients">
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
                    <b-field label="Contacts">
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
                    <b-field label="Reset Filters">
                        <button
                            class="button"
                            @click="clearFilters"
                        >
                            <b-icon icon="eraser is-small"></b-icon>
                            <span>Reset Filters</span>
                        </button>
                    </b-field>
                </div>
            </div>
            <div class="column">
                <slot></slot>
            </div>
            <div class="column is-one-fifth">
                <div v-sticky="{zIndex:10,stickyTop:84,enabled:true}">
                    <b-field label="Enter some tags">
                        <b-taginput
                                v-model="tags"
                                :data="filteredTags"
                                autocomplete
                                allow-new
                                icon="label"
                                placeholder="Add a tag"
                                @typing="getFilteredTags">
                        </b-taginput>
                    </b-field>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.margin-top {
  margin-top: 2em;
}
/*.is-right-aligned {*/
/*.field {*/
/*text-align: right;*/
/*}*/
/*}*/
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
      clearFilters: "feed/clearFilters",
    }),
    getFilteredTags(text) {
      this.filteredTags = this.totalTags.filter(
        tag =>
          tag.toLowerCase().indexOf(text.toLowerCase()) >= 0 &&
          this.tags.indexOf(tag) === -1
      );
    }
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
