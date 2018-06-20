<template>
    <div class="margin-top">
        <div class="columns">
            <div class="column is-one-fifth">
                <div v-sticky="{zIndex:10,stickyTop:84,enabled:true}"> <!-- STICKY WRAPPER -->
                    <b-field label="Projects">
                        <b-dropdown v-model="filterOne">
                            <button
                                    :class="'button is-fluid' + (filterOne ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>{{ filterOne ? filterOne : 'Projects' }}</span>
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
                        <b-dropdown v-model="filterTwo">
                            <button
                                    :class="'button is-fluid' + (filterTwo ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>{{ filterTwo ? filterTwo : 'Clients' }}</span>
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
                        <b-dropdown v-model="filterThree">
                            <button
                                    :class="'button is-fluid' + (filterThree ? ' is-primary' : '')"
                                    slot="trigger"
                            >
                                <b-icon icon="filter is-small"></b-icon>
                                <span>{{ filterThree ? filterThree : 'Contacts' }}</span>
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
export default {
  name: "MainUI",
  data: () => ({
    filterOne: null,
    filterTwo: null,
    filterThree: null,
    tags: [],
    filteredTags: [],
    filters: {
      project: ["Project One", "Project Two", "Project Three"],
      client: ["Client One", "Client Two", "Client Three"],
      contact: ["Contact One", "Contact Two", "Contact Three"]
    },
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
  }
};
</script>
