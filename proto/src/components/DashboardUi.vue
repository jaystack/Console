<template>
    <div class="margin-top">
        <div class="columns">
            <div class="column is-one-quarter">
                <aside class="menu" v-sticky="{zIndex:10,stickyTop:84,enabled:true}">
                    <p class="menu-label">
                        My Dashboard
                    </p>
                    <ul class="menu-list">
                        <li>
                            <router-link
                                    :to="{name:'dashboard'}"
                                    active-class="is-active"
                                    exact
                            >
                                Dashboard
                            </router-link>
                        </li>
                    </ul>
                    <p class="menu-label">
                        My Connectors
                    </p>
                    <ul class="menu-list">
                        <li>
                            <router-link
                                :to="{name:'dashboard.slack'}"
                                active-class="is-active"
                                exact
                            >
                                Slack
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{name:'dashboard.email'}"
                                 active-class="is-active"
                                exact
                            >
                                Email
                            </router-link>
                        </li>
                        <li>
                            <a style="opacity:.5">
                                Add New Connector
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import VueSticky from "vue-sticky";
export default {
  directives: {
    sticky: VueSticky
  }
};
</script>
