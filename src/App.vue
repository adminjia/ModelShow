<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <a-spin id="loadingForm" :spinning="spinning" :tip="tip" size="large"></a-spin>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "dayjs/locale/zh-cn";
import Config from "module/Class_Config";
// 阻止浏览器默认右键菜单
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
// 等待窗体
let spinning = ref(false);
let tip = ref("");
let waitingCount = 0;
Config.showLoading = (text) => {
  tip.value = text ? text : "正在请求数据，请稍候...";
  waitingCount++;
  spinning.value = true;
};
Config.hideLoading = () => {
  waitingCount--;
  if (waitingCount < 0) {
    waitingCount = 0
  }
  spinning.value = waitingCount > 0;
};
</script>
<style scoped>
#loadingForm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 50vh 0;
  color: aliceblue;
  background-color: #2196f326;
  font-size: 1rem;
  z-index: 2000;
}
</style>
