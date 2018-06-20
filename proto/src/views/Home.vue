<template>
  <MainUi>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </MainUi>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MainUi from '@/components/MainUi';

export default {
  name: "home",
  components: {
    HelloWorld,
    MainUi
  }
};
</script>
