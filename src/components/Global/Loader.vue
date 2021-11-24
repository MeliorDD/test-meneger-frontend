<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
  transition: all 0.5s ease;
  animation: rotate 1s linear infinite;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid #417ffb;
  border-right: 3px solid transparent;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@keyframes rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
