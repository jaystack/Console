<template>
    <div>
        <div class="columns" style="margin-top:0!important;min-height: calc(100vh - 52px);">
            <div class="column is-one-fifth" style="border-right: 1px solid rgba(10,10,10,.1);padding-top:2em;">
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
                            <router-link
                                :to="{name:'dashboard.drive'}"
                                active-class="is-active"
                                exact
                            >
                                Google Drive
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{name:'dashboard.github'}"
                                 active-class="is-active"
                                exact
                            >
                                GitHub
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
            <div class="column" style="padding:2em 1em;background: rgb(250, 250, 250);">
                <slot></slot>
            </div>
            <div class="column is-one-fifth" style="border-left: 1px solid rgba(10,10,10,.1);padding-top:1em;">

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
