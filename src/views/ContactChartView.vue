<template>
  <main>
    <div class="actions">
      <router-link :to="{ name: 'contact.list' }"
      ><img :src="leftIcon" alt="" />Voltar</router-link
    >
    </div>
    <div class="chart-container">
      <h2>Segmentação por estado</h2>
      <PieChart :options="stateChartOptions" :series="stateSeries" />
    </div>
    <div class="chart-container">
      <h2>Segmentação por cidade</h2>
      <PieChart :options="cityChartOptions" :series="citySeries" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useContactStore } from '@/stores/contacts'
import PieChart from '@/components/PieChart.vue'
import leftIcon from '@/assets/left.png'

const contactStore = useContactStore()
const { chartCity, chartState } = storeToRefs(contactStore)

onMounted(async () => {
  await contactStore.getCharts()
})

const commonChartOptions = {
  chart: { type: 'pie', height: 350 },
  plotOptions: {
    pie: {
      customScale: 1,
      expandOnClick: false,
      dataLabels: {
        offset: 0,
      },
    },
  },
  legend: {
    position: 'right',
  },
}

const stateChartOptions = computed(() => ({
  ...commonChartOptions,
  labels: chartState.value.map((item) => item.state),
}))
const stateSeries = computed(() => chartState.value.map((item) => item.total))

const cityChartOptions = computed(() => ({
  ...commonChartOptions,
  labels: chartCity.value.map((item) => `${item.city}`),
}))
const citySeries = computed(() => chartCity.value.map((item) => item.total))
</script>

<style scoped>
main {
  padding: 20px;
}
.actions a {
  display: flex;
  align-items: center;
  gap: 4px;
}
.chart-container {
  margin: 20px 0;
  width: 380px;
}
h2 {
  font-size: 14px;
}
</style>
