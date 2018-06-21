<template>
    <div
            class="card"
            v-if="includes.indexOf(object.type) >= 0"
            :key="object.id"
    >
        <header class="card-header">
            <p class="card-header-title">
                <img :src="`/img/${object.type}.png`" style="max-width:16px;margin-right:.5em;">
                {{toTitleCase(object.type)}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <b-icon icon="dots-horizontal"></b-icon>
        </span>
            </a>
        </header>

        <div class="card-content">
            <div class="content">
                <p>{{object.content}}</p>
                <time>{{object.when.toLocaleString()}}</time>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SlackItem",
  props: {
    object: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      includes: "feed/getIncludes"
    })
  },
  methods: {
    toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  }
};
</script>
