<template>
    <div class="pie-chart">
      <apexchart type="pie" height="350" :options="options" :series="series" />
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    options: {
      type: Object,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .pie-chart {
    width: 100%;
  }
  </style>
  