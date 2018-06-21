<template>
  <MainUi>
    <Feed/>
  </MainUi>
</template>

<script>
// @ is an alias to /src
import Feed from "@/components/Feed";
import MainUi from "@/components/MainUi";

export default {
  name: "home",
  components: {
    Feed,
    MainUi
  }
};
</script>
