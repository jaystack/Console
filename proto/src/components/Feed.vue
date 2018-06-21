<template>
  <div class="feed">
    <transition-group name="list">
      <FeedFactory
          :object="item"
          v-for="item in computedFeed"
          :includes="includes"
          :key="item.id"
          v-if="item"
      ></FeedFactory>
    </transition-group>
  </div>
</template>

<style lang="scss">
time {
  opacity: 0.5;
  font-size: 80%;
  padding-top: 1em;
}
.list {
  &-move {
    transition: all 600ms ease-in-out 50ms;
  }
  &-enter-active {
    transition: all 300ms ease-out;
  }

  &-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: 0;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter {
    transform: scale(0.9);
  }
}
.feed {
  .card {
    margin-bottom: 1em;
    border-radius: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import FeedFactory from "./FeedFactory";
export default {
  name: "Feed",
  components: { FeedFactory },
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
        if (this.includes.indexOf(el.type) === -1) isMatch = false;
        return isMatch;
      });
    }
  },
  data: () => ({
    feed: [
      {
        id: 1,
        type: "slack",
        from: "childishforces",
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
        from: "z",
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
        from: "z",
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
      },
      {
        id: 6,
        type: "drive",
        from: "z",
        image: "http://via.placeholder.com/100x100",
        client: "Client Two",
        contact: "Contact Three",
        project: "Project Two",
        when: new Date(),
        content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
        "dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lorem donec massa " +
        "sapien faucibus et molestie ac feugiat. Nec ullamcorper sit amet risus nullam eget felis eget. "
      }
    ]
  })
};
</script>
