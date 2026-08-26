<template>
  <div>
    <!-- cesium球 -->
    <MapContainer :callBack="initMapCallBack" />
  </div>
</template>
<script setup>
import MapContainer from "components/MapContainer.vue";
</script>
<style scoped></style>
