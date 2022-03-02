<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button class="popup-close" @click="TogglePopup()">Close Popup</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["TogglePopup"],
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  position: relative;
  background: white;
  padding: 25px;
}
</style>
