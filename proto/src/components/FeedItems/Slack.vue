<template>
    <div
            class="card"
            v-if="includes.indexOf(object.type) >= 0"
            :key="object.id"
    >
        <header class="card-header">
            <p class="card-header-title">
                <img :src="`/img/${object.type}.png`" style="max-width:16px;margin-right:.5em;">
                Slack
                <span style="opacity:.6;font-size:80%;">&nbsp;from @{{ object.from }}</span>
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <b-icon icon="dots-horizontal"></b-icon>
        </span>
            </a>
        </header>

        <div class="card-content">
            <div class="content">
                <p ref="theContent">{{object.content}}</p>
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
