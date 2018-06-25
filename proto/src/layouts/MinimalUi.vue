<template>
    <div class="minimal-ui">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    .minimal-ui {
        background: #7957d5;
        min-height: calc(100vh - 52px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
export default {
  name: "MinimalUi",
  data: () => ({}),
};
</script>
