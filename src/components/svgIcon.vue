<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.back {
  width: 28px;
  height: 28px;
  transform: translateX(-7px);
}
.weixiao {
  width: 36px;
  height: 36px;
  /* transform: translateX(-7px)translateY(-2px); */
}
.xixiao {
  width: 36px;
  height: 36px;
  /* transform: translateX(-7px)translateY(-2px); */
}
.wenhao {
  width: 36px;
  height: 36px;
  /* transform: translateX(-7px)translateY(-2px); */
}
</style>
