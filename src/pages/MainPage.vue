<template>
  <div>
    <!-- cesium球 -->
    <MapContainer @callBack="initMapCallBack" />
    <template v-if="initComponents">
      <!-- 模型展示 -->
      <ModelDisplay></ModelDisplay>
    </template>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MapContainer from "components/MapContainer.vue";
import ModelDisplay from "components/ModelDisplay.vue";

const initComponents = ref()
const initMapCallBack = () => {
  initComponents.value = true;
}
</script>
<style scoped></style>
