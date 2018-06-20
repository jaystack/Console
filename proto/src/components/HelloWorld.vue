<template>
  <div>
    <div class="card" v-for="item in feed" :key="item.id" style="margin-bottom:1em;">
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
          <time datetime="2016-1-1">{{item.when.toLocaleString()}}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
time {
  opacity: 0.5;
  font-size: 80%;
  padding-top: 1em;
}
</style>

<script>
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
  data: () => ({
    feed: [
      {
        id: 1,
        type: "slack",
        image: "http://via.placeholder.com/100x100",
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
