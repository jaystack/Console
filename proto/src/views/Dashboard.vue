<template>
  <DashboardUi>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </DashboardUi>
</template>

<style lang="scss">
.box.aspect {
  padding: 0;
  display: block;
  position: relative;
  &.empty {
    box-shadow: none;
    border: 2px dashed rgba(10, 10, 10, 0.1);
    color: rgba(10, 10, 10, 0.1);
  }
  .aspect-inner {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  &::before {
    content: "";
    padding-top: 60%;
    display: block;
  }
}
</style>

<script>
import DashboardUi from "@/components/DashboardUi";
export default {
  name: "Settings",
  data: () => ({}),
  components: {
    DashboardUi
  }
};
</script>
