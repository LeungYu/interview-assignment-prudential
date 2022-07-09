<template>
  <div class="chart">
      <div class="chart-content" ref="chart-bar-container">
          <div v-for="(item, index) of localListData" :key="item.value" :class="item.show === true ? 'chart-content-element' : 'chart-content-element-hidden'">
              <div :style="{height: item.show === true ? (item.value ? `${containerHeight * item.value / 100}px` : '87px') : '44px'}" :class="['chart-bar-background', getChartContentClass(index, item)]">
                <div :class="getChartContentValueClass(index)">{{item.value}}</div>
                <div class="chart-content-element-icontainer">
                    <div class="chart-content-element-icontainer-incontainer">
                        <div :class="getChartContentIContainerClass(index)">
                            <SvgIcon :icon-class="getChartContentIconClass(index)" :class-name="getChartContentIconClass(index)"/>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div class="chart-key">
          <div v-for="(item, index) of localListData" :key="item.key" class="chart-key-element" @click="() => onChangeSelection(index)">
              <div :class="getChartKeyClass(index)">{{item.key}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import SvgIcon from './svgIcon.vue'
export default {
  name: 'ChartView',
  components: { SvgIcon },
  props: {
    listData: {}
  },
  created () {
    this.$nextTick(() => {
      const containerHeight = this.$refs['chart-bar-container']?.clientHeight
      this.containerHeight = containerHeight !== undefined ? containerHeight : 0
    })
  },
  mounted () {
    this.localListData = this.listData.map(T => {
      const item = JSON.parse(JSON.stringify(T))
      item.show = false
      item.selected = false
      return item
    })
    this.$nextTick(() => {
      for (let index = 0; index < this.localListData.length; index++) {
        setTimeout(() => {
          this.localListData[index].show = true
        }, index * 100)
      }
    })
  },
  data () {
    return {
      localListData: [],
      containerHeight: 0
    }
  },
  methods: {
    onChangeSelection (index) {
      if (this.localListData[index].value !== null && index !== this.localListData.length - 1) {
        this.localListData = this.localListData.map((T, key) => {
          T.selected = key === index
          return T
        })
      }
    },
    getChartContentClass (index) {
      if (this.localListData[index].selected) {
        if (this.localListData[index].value >= 90) {
          return ['chart-content-element-initial-well', 'chart-content-element-initial-well-selected']
        } else if (this.localListData[index].value !== null) {
          return ['chart-content-element-initial-normal', 'chart-content-element-initial-normal-selected']
        } else {
          return 'chart-content-element-initial-none'
        }
      } else {
        if (this.localListData[index].value >= 90) {
          return 'chart-content-element-initial-well'
        } else if (this.localListData[index].value !== null) {
          return 'chart-content-element-initial-normal'
        } else {
          return 'chart-content-element-initial-none'
        }
      }
    },
    getChartContentValueClass (index) {
      if (this.localListData[index].show) {
        if (this.localListData[index].selected) {
          console.log('se', index)
          return ['chart-content-element-show-value', 'chart-content-element-show-value-selected']
        } else {
          return 'chart-content-element-show-value'
        }
      } else {
        if (this.localListData[index].value >= 90) {
          return 'chart-content-element-initial-well-value'
        } else if (this.localListData[index].value !== null) {
          return 'chart-content-element-initial-normal-value'
        } else {
          return ''
        }
      }
    },
    getChartContentIContainerClass (index) {
      if (this.localListData[index].show) {
        if (this.localListData[index].value >= 90) {
          return 'chart-content-element-icontainer-incontainer-show-well'
        } else if (this.localListData[index].value !== null) {
          return 'chart-content-element-icontainer-incontainer-show-normal'
        } else {
          return 'chart-content-element-icontainer-incontainer-show-none'
        }
      } else {
        if (this.localListData[index].value >= 90) {
          return 'chart-content-element-icontainer-incontainer-initial-well'
        } else if (this.localListData[index].value !== null) {
          return 'chart-content-element-icontainer-incontainer-initial-normal'
        } else {
          return 'chart-content-element-icontainer-incontainer-initial-none'
        }
      }
    },
    getChartContentIconClass (index) {
      if (this.localListData[index].value >= 90) {
        return 'xixiao'
      } else if (this.localListData[index].value !== null) {
        return 'weixiao'
      } else {
        return 'wenhao'
      }
    },
    getChartKeyClass (index) {
      if (this.localListData[index].show) {
        if (this.localListData[index].selected === true && this.localListData[index].value !== null && index !== this.localListData.length - 1) {
          return this.localListData[index].value >= 90 ? 'chart-key-element-select-well' : 'chart-key-element-select-normal'
        } else {
          return index === this.localListData.length - 1 ? 'chart-key-element-last' : 'chart-key-element-normal'
        }
      } else {
        return 'chart-key-element-hidden'
      }
    }
  },
  computed: {}
}
</script>

<style lang="less">
.chart{
    width: 100%;
    height: 100%;
    &-content{
        width: 100%;
        height: 283px;
        display: flex;
        justify-content: space-around;
        &-element {
            font-weight: 700;
            font-size: 20px;
            text-align: center;
            font-family: Nunito;
            color: white;
            width: 44px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            &-hidden {
                font-weight: 700;
                font-size: 20px;
                text-align: center;
                font-family: Nunito;
                color: white;
                opacity: 0;
                width: 44px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                transition: 0.5s all ease-in;
            }
            &-initial {
                &-none{
                    width: 44px;
                    border-radius: 30px;
                    background: #CFCFCF;
                    transition: 0.25s height ease-in 0.25s;
                    display: flex;
                    flex-direction: column;
                }
                &-normal {
                    width: 44px;
                    border-radius: 30px;
                    background: #52C873;
                    transition: 0.25s height ease-in 0.25s;
                    display: flex;
                    flex-direction: column;
                    &-selected{
                        transition: 0.25s all ease-in;
                        background: linear-gradient(180deg, #42F373 42.71%, #A1FD44 100%);
                        border: 3px solid #DCFFD6;
                        transform: translateX(-3px);
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
                    }
                    &-value{
                        height: 0;
                        width: 44px;
                        line-height: 37px;
                        color: #52C873;
                    }
                }
                &-well {
                    width: 44px;
                    border-radius: 30px;
                    background: #FF823C;
                    transition: 0.25s height ease-in 0.25s;
                    display: flex;
                    flex-direction: column;
                    &-selected{
                        transition: 0.25s all ease-in;
                        background: linear-gradient(180deg, #FFA14A 35.42%, #FFCC4A 100%);
                        border: 3px solid #FFE9D5;
                        transform: translateX(-3px);
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    }
                    &-value{
                        height: 0;
                        width: 44px;
                        line-height: 37px;
                        color: #FF823C;
                    }
                }
            }
            &-show {
                &-value{
                    height: 25px;
                    width: 44px;
                    line-height: 37px;
                    color: white;
                    transition: 0.5s all ease-in 0.25s;
                    &-selected{
                        transition: 0.5s all ease-in 0.25s;
                        font-size: 24px;
                    }
                }
            }
            &-icontainer{
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                &-incontainer{
                    display: flex;
                    justify-content: center;
                    padding-bottom: 4px;
                    &-initial{
                        &-none{
                            transform: scale(0);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #F2F2F2;
                        }
                        &-normal {
                            transform: scale(0);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #D4F3D3;
                        }
                        &-well {
                            transform: scale(0);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #FFDEC9;
                        }
                    }
                    &-show{
                        &-none{
                            transform: scale(1);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #F2F2F2;
                            transition: 0.5s transform ease-in;
                        }
                        &-normal {
                            transform: scale(1);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #D4F3D3;
                            transition: 0.5s transform ease-in;
                        }
                        &-well {
                            transform: scale(1);
                            width: 36px;
                            height: 36px;
                            border-radius: 36px;
                            background: #FFDEC9;
                            transition: 0.5s transform ease-in;
                        }
                    }
                }
            }
        }
    }
    &-key{
        margin-top: 12px;
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-around;
        &-element {
            font-weight: 500;
            font-size: 18px;
            text-align: center;
            font-family: PingFang HK;
            width: 36px;
            height: 36px;
            line-height: 36px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            &-hidden {
                opacity: 0;
                width: 22px;
                height: 22px;
                line-height: 22px;
            }
            &-normal {
                color: #2D2F33;
                transition: 0.75s all ease-in;
                width: 36px;
                height: 36px;
            }
            &-last {
                color: #2D2F33;
                border-radius: 8px;
                background: #2D2F33;
                color: white;
                transition: 0.75s all ease-in;
                width: 36px;
                height: 36px;
            }
            &-select-normal {
                color: #52C873;
                border-radius: 8px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                transition: 0.2s all ease-in;
                width: 36px;
                height: 36px;
            }
            &-select-well {
                color: #F36A1B;
                border-radius: 8px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                transition: 0.2s all ease-in;
                width: 36px;
                height: 36px;
            }
        }
    }
}
</style>
