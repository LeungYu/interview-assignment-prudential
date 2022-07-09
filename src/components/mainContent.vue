<template>
  <div class="main-content">
      <div class="main-content-desc">
          <div class="main-content-desc-name">
              <div
              class="main-content-desc-name-avatar"
              :style="{
                  background: `url(${require('@/assets/images/avatar.png')})`,
                  backgroundPosition: '50% 50%',
                  backgroundSize: '100% 100%',
                }"></div>
              <div class="main-content-desc-name-title">李强</div>
          </div>
          <div class="main-content-desc-score">{{score}}</div>
          <div class="main-content-desc-subtitle">周平均心情指数</div>
      </div>
      <div class="main-content-chart">
          <div class="main-content-chart-base">
              <div class="main-content-chart-base-split"></div>
              <div class="main-content-chart-base-split" style="margin-top: 144px"></div>
          </div>
          <div class="main-content-chart-container">
              <ChartView :list-data="listData"/>
          </div>
      </div>
  </div>
</template>

<script>
import ChartView from '@/components/chart.vue'
export default {
  name: 'MainContent',
  components: {
    ChartView
  },
  mounted () {},
  data () {
    return {
      listData: [
        { key: '六', value: 86 },
        { key: '日', value: 80 },
        { key: '一', value: null },
        { key: '二', value: 90 },
        { key: '三', value: 92 },
        { key: '四', value: 97 },
        { key: '五', value: 81 }
      ]
    }
  },
  methods: {},
  computed: {
    score () {
      const pureData = this.listData.map(T => T.value).filter(T => T !== null)
      const score = Math.round(pureData.reduce((a, b) => (a + b)) / pureData.length)
      return score
    }
  }
}
</script>

<style lang="less">
.main-content {
    height: auto;
    width: 100%;
    padding-top: 15px;
    &-desc {
        border-radius: 24px 24px 0 0;
        box-shadow: 0px -6px 16px rgba(0, 0, 0, 0.15);
        width: calc(100% - 24px);
        margin-left: 12px;
        height: 238px;
        text-align: center;
        &-name {
            height: 36px;
            padding-top: 50px;
            &-avatar {
                width: 36px;
                height: 36px;
                border-radius: 36px;
                display: inline-block;
                vertical-align: top;
            }
            &-title {
                width: auto;
                height: 28px;
                line-height: 28px;
                display: inline-block;
                font-size: 20px;
                font-weight: 500;
                font-family: PingFang HK;
                color: #2D2F33;
                vertical-align: top;
                transform: translateY(4px);
                margin-left: 10px;
            }
        }
        &-score {
            height: 98px;
            font-weight: 800;
            font-size: 72px;
            line-height: 98px;
            font-family: Nunito;
            color: #2D2F33;
        }
        &-subtitle {
            height: 25px;
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            font-family: PingFang HK;
            color: #929292;
        }
    }
    &-chart {
        width: calc(100% - 24px);
        margin-left: 12px;
        height: 331px; // 283px + 12px + 36px
        position: relative;
        &-base {
            width: 100%;
            height: 100%;
            position: absolute;
            &-split {
                width: calc(100% - 24px);
                margin-left: 12px;
                height: 2px;
                background: #F2F2F2;
            }
        }
        &-container {
            width: 100%;
            height: 100%;
            position: absolute;
        }
    }
}
</style>
