import { shallowMount } from '@vue/test-utils'
import MainContent from '@/components/mainContent.vue'
import Chart from '@/components/chart.vue'

describe('MainContent.vue', () => {
  const wrapper = shallowMount(MainContent, {})
  it('1) MainContent: Test score value', () => {
    const score = wrapper.find('.main-content-desc-score')
    expect(score.text()).toBe('88')
  })
})

describe('Chart.vue', () => {
  const wrapper = shallowMount(Chart, {
    propsData: {
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
  })
  it('2) Chart: Test svg type and css class between different bar values', async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const chartBars = wrapper.findAll('.chart-bar-background')
        for (let index = 0; index < chartBars.length; index++) {
          const chartBar = chartBars.at(index)
          const numberText = chartBar.find('.chart-content-element-show-value').text()
          const svg = chartBar.find('svgicon-stub')
          if (numberText === '') {
            // 没有值的情况使用灰色css类
            expect(chartBar.findAll('.chart-content-element-icontainer-incontainer-show-none')).toHaveLength(1)
            expect(svg.attributes('iconclass')).toBe('wenhao')
          } else if (Number(numberText) >= 90) {
            // 值大于等于90的情况使用橙色css类
            expect(chartBar.findAll('.chart-content-element-icontainer-incontainer-show-well')).toHaveLength(1)
            expect(svg.attributes('iconclass')).toBe('xixiao')
          } else {
            // 值小于90的情况使用绿色css类
            expect(chartBar.findAll('.chart-content-element-icontainer-incontainer-show-normal')).toHaveLength(1)
            expect(svg.attributes('iconclass')).toBe('weixiao')
          }
        }
        resolve()
      }, 2000)
    })
  })
  it('3) Chart: Test css class change after clicking different bars', async () => {
    const chartKeys = wrapper.findAll('.chart-key-element')
    const chartKeyNormal = chartKeys.at(1)
    const chartKeyWell = chartKeys.at(3)
    // 点击第二个条形图的坐标
    chartKeyNormal.trigger('click')
    await new Promise((resolve) => {
      setTimeout(() => {
        // 使用被选中的css类
        const chartBars = wrapper.findAll('.chart-bar-background')
        const chartBarNormal = chartBars.at(1)
        expect(chartBarNormal.attributes('class').includes('chart-content-element-initial-normal-selected')).toBeTruthy()
        resolve()
      }, 1000)
    })
    chartKeyWell.trigger('click')
    await new Promise((resolve) => {
      setTimeout(() => {
        const chartBars = wrapper.findAll('.chart-bar-background')
        const chartBarNormal = chartBars.at(1)
        const chartBarWell = chartBars.at(3)
        // 使用被选中的css类,同时上一个被选中的坐标对应的条形图解除选中状态
        expect(!(chartBarNormal.attributes('class').includes('chart-content-element-initial-normal-selected'))).toBeTruthy()
        expect(chartBarWell.attributes('class').includes('chart-content-element-initial-well-selected')).toBeTruthy()
        resolve()
      }, 1000)
    })
  })
})
