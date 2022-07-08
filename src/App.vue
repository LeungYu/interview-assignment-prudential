<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="less">
.fade-enter-active, .fade-leave-active {
    transition: all 0.75s ease;
    opacity: 100% !important;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0 !important;
  }
#app {
  width: 100%;
  height: 100%;
}
</style>
