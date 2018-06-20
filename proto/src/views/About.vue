<template>
  <DashboardUi>
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box aspect">
          <div class="aspect-inner">
            <img src="/img/slack.png" class="image">
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box aspect">
          <div class="aspect-inner">
            <img src="/img/email.png" class="image">
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box aspect empty">
          <div class="aspect-inner">
            <b-icon icon="plus" size="is-large"></b-icon>
          </div>
        </div>
      </div>
    </div>
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
