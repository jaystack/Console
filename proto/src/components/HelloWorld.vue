<template>
  <div class="feed">
    <transition-group name="list" mode="out-in">
      <div
        class="card"
        v-for="item in computedFeed"
        v-if="includes.indexOf(item.type) >= 0"
        :key="item.id"
      >
        <header class="card-header">
          <p class="card-header-title">
            <img :src="`/img/${item.type}.png`" style="max-width:16px;margin-right:.5em;">
            {{toTitleCase(item.type)}}
          </p>
          <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <b-icon icon="dots-horizontal"></b-icon>
        </span>
          </a>
        </header>

        <div class="card-content">
          <div class="content">
            <p>{{item.content}}</p>
            <time>{{item.when.toLocaleString()}}</time>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss">
time {
  opacity: 0.5;
  font-size: 80%;
  padding-top: 1em;
}
.list-move {
  transition: transform 0.5s;
}
.feed {
  .card {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Feed",
  methods: {
    toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  },
  computed: {
    ...mapGetters({
      search: "feed/getSearch",
      filters: "feed/getFilterSelections",
      includes: "feed/getIncludes"
    }),
    computedFeed() {
      return this.feed.filter(el => {
        let isMatch = true;
        if (this.filters.client !== null)
          if (this.filters.client !== el.client) isMatch = false;
        if (this.filters.project !== null)
          if (this.filters.project !== el.project) isMatch = false;
        if (this.filters.contact !== null)
          if (this.filters.contact !== el.contact) isMatch = false;
        return isMatch;
      });
    }
  },
  data: () => ({
    feed: [
      {
        id: 1,
        type: "slack",
        image: "http://via.placeholder.com/100x100",
        client: "Client One",
        contact: "Contact Two",
        project: "Project Three",
        when: new Date(),
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lorem donec massa " +
          "sapien faucibus et molestie ac feugiat. Nec ullamcorper sit amet risus nullam eget felis eget. Fringilla " +
          "ut morbi tincidunt augue interdum velit euismod in pellentesque. Amet est placerat in egestas."
      },
      {
        id: 2,
        type: "email",
        image: "http://via.placeholder.com/100x100",
        client: "Client One",
        contact: "Contact Two",
        project: "Project Three",
        when: new Date(),
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "Adipiscing bibendum est ultricies integer quis auctor. Tortor vitae purus faucibus ornare suspendisse " +
          "sed nisi. Non blandit massa enim nec dui nunc mattis enim. Congue mauris rhoncus aenean vel elit " +
          "scelerisque. Enim ut tellus elementum sagittis vitae. Consequat nisl vel pretium lectus quam id."
      },
      {
        id: 3,
        type: "email",
        image: "http://via.placeholder.com/100x100",
        client: "Client Two",
        contact: "Contact One",
        project: "Project One",
        when: new Date(),
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lorem donec massa " +
          "sapien faucibus et molestie ac feugiat. Nec ullamcorper sit amet risus nullam eget felis eget. Fringilla " +
          "scelerisque. Enim ut tellus elementum sagittis vitae. Consequat nisl vel pretium lectus quam id."
      },
      {
        id: 4,
        type: "slack",
        image: "http://via.placeholder.com/100x100",
        client: "Client Three",
        contact: "Contact Three",
        project: "Project Two",
        when: new Date(),
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lorem donec massa " +
          "sapien faucibus et molestie ac feugiat. Nec ullamcorper sit amet risus nullam eget felis eget. Fringilla " +
          "ut morbi tincidunt augue interdum velit euismod in pellentesque. Amet est placerat in egestas. " +
          "Adipiscing bibendum est ultricies integer quis auctor. Tortor vitae purus faucibus ornare suspendisse " +
          "sed nisi. Non blandit massa enim nec dui nunc mattis enim. Congue mauris rhoncus aenean vel elit " +
          "scelerisque. Enim ut tellus elementum sagittis vitae. Consequat nisl vel pretium lectus quam id."
      },
      {
        id: 5,
        type: "slack",
        image: "http://via.placeholder.com/100x100",
        client: "Client Two",
        contact: "Contact Three",
        project: "Project Two",
        when: new Date(),
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lorem donec massa " +
          "sapien faucibus et molestie ac feugiat. Nec ullamcorper sit amet risus nullam eget felis eget. Fringilla " +
          "ut morbi tincidunt augue interdum velit euismod in pellentesque. Amet est placerat in egestas. " +
          "Adipiscing bibendum est ultricies integer quis auctor. Tortor vitae purus faucibus ornare suspendisse " +
          "sed nisi. Non blandit massa enim nec dui nunc mattis enim. Congue mauris rhoncus aenean vel elit " +
          "scelerisque. Enim ut tellus elementum sagittis vitae. Consequat nisl vel pretium lectus quam id."
      }
    ]
  })
};
</script>
