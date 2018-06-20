<template>
    <div class="margin-top">
        <div class="columns">
            <div class="column is-one-quarter">
                <aside class="menu" v-sticky="{zIndex:10,stickyTop:84,enabled:true}">
                    <p class="menu-label">
                        My Connectors
                    </p>
                    <ul class="menu-list">
                        <li><a>Slack</a></li>
                        <li><a>Email</a></li>
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
