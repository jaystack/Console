<template>
    <div class="fadezoom">
        <div class="box">
            <h4 class="title is-4">Slack</h4>
            <hr>
            <div class="field">
                <b-switch v-model="signedIn">Emulate signed in status</b-switch>
            </div>
            <hr>
            <template v-if="signedIn">
                <!--<b-message type="is-success">-->
                    <!--You have successfully paired your account to Console. You can now configure-->
                    <!--settings and map channels to projects.-->
                <!--</b-message>-->
                <!--<hr>-->
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content" style="align-self: center;">
                        <p class="title is-4">Chris Schofield</p>
                        <p class="subtitle is-6">@ChildishForces</p>
                    </div>
                </div>
                <br>
                <b-message type="is-warning">
                    If this is not you, <a href="#">click here to log out</a>.
                </b-message>
                <hr>
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Projects">
                        <selector :options="filters.project" expanded></selector>
                    </b-tab-item>
                    <b-tab-item label="Client">
                        <selector :options="filters.client" expanded></selector>
                    </b-tab-item>
                    <b-tab-item label="Contacts">
                        <selector :options="filters.contact" expanded></selector>
                    </b-tab-item>
                </b-tabs>
            </template>
            <template v-else>
                <b-message type="is-info">
                    To get connected to your Slack account click the button below. It will take you
                    to Slack to authorise access to this application.
                </b-message>
                <slack-auth></slack-auth>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
    .b-tabs .tab-content {
        overflow: visible;
        overflow-y: hidden;
    }
</style>

<script>
    import SlackAuth from '../../components/SlackAuth';
    import Selector from '../../components/Selector';
    import { mapGetters, mapActions } from 'vuex';

    export default {
      name: "DashSlack",
      data: () => ({
        signedIn: false,
        activeTab: null,
      }),
      computed: {
        ...mapGetters({
          filters: 'feed/getFilters',
       }),
      },
      methods: {
        ...mapActions({
          //
        })
      },
      components: {
        SlackAuth,
        Selector
      }
    }
</script>
