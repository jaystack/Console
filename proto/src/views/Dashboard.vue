<template>
  <DashboardUi>
    <transition name="fadezoom" mode="out-in" >
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

.fadezoom-enter-active {
  animation: enter 0.2s;
}

.fadezoom-leave-active {
  animation: enter 0.2s reverse;
}
@keyframes enter {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
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
