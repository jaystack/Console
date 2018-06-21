<template>
    <div
            class="card"
            v-if="includes.indexOf(object.type) >= 0"
            :key="object.id"
    >
        <header class="card-header">
            <p class="card-header-title">
                <img src="/img/google-drive.png" style="max-width:16px;margin-right:.5em;">
                Google Drive
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <b-icon icon="dots-horizontal"></b-icon>
        </span>
            </a>
        </header>

        <div class="card-content">
            <div class="content">
                <b-message type="is-info" has-icon>
                    <strong>File Update:</strong> The thing uploaded! And now you can go and get it at the link below.
                </b-message>
                <p ref="theContent">{{object.content}}</p>
                <p><a href="#">{{object.link}}</a></p>
                <time>{{object.when.toLocaleString()}}</time>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Mark from "mark.js";

export default {
  name: "SlackItem",
  props: {
    object: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      includes: "feed/getIncludes",
      search: "feed/getSearch"
    })
  },
  data: () => ({
    markInstance: null,
    canMark: false
  }),
  mounted() {
    this.markInstance = new Mark(this.$refs.theContent);
    this.canMark = true;
  },
  methods: {
    mark(value) {
      const that = this;
      if (this.canMark && this.search) {
        that.markInstance.unmark({
          done: function () {
            that.markInstance.mark(value);
          }
        });
      }
    },
    unmark() {
      this.markInstance.unmark();
    }
  },
  watch: {
    search(newVal) {
      if (newVal) this.mark(newVal);
      else this.unmark();
    }
  }
};
</script>
