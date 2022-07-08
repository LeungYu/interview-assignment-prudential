<template>
  <div id="index">
      <Nav/>
      <MainContent/>
  </div>
</template>

<script>
import Nav from '@/components/nav.vue'
import MainContent from '@/components/mainContent.vue'
export default {
  name: 'IndexView',
  components: { Nav, MainContent },
  mounted () {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
#index {
  width: 100%;
  height: 100%;
}
</style>
