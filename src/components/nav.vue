<template>
  <div id="nav">
    <div class="back"><SvgIcon icon-class="back" class-name="back"/></div>
    <span class="title">历史心情指数</span>
  </div>
</template>

<script>
import SvgIcon from './svgIcon.vue'

export default {
  components: { SvgIcon },
  name: 'NavView',
  mounted () {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
#nav {
  display: block;
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  position: relative;
}

.back{
  position: absolute;
  width: 36px;
  height: 36px;
  left: 12px;
  top: 6px;
}

.title{
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  font-family: PingFang HK;
  color: #2D2F33;
}
</style>
