<template>
  <div>
    <div id="mapContainer"></div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import Config from "module/Class_Config";
const emit = defineEmits(['callBack'])

onMounted(() => {
  let viewer = new Cesium.Viewer("mapContainer", {
    animation: false,
    fullscreenButton: false,
    homeButton: false,
    geocoder: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: true,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    baseLayer: new Cesium.ImageryLayer(
      new Cesium.UrlTemplateImageryProvider({
        url: "https://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&layer=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&tk=848089cab53a169cef2cabdc84c8f644",
        maximumLevel: 18,
      })
    ),
    mapProjection: new Cesium.WebMercatorProjection(),
    contextOptions: {
      webgl: {
        alpha: true,
        depth: true,
        stencil: true,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true,
      }
    },
  });
  var start = Cesium.JulianDate.fromIso8601("2024-09-10");
  var end = Cesium.JulianDate.fromIso8601("2024-09-20");
  viewer.timeline.zoomTo(start, end);
  var clock = viewer.clock;
  clock.startTime = start;
  clock.endTime = end;
  clock.currentTime = Cesium.JulianDate.fromIso8601("2024-09-10T04:00:00Z");
  viewer.timeline.container.style.visibility = "hidden";
  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 抗锯齿
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio
  }
  viewer.scene.postProcessStages.fxaa.enabled = true
  // 关闭大气层
  viewer.scene.globe.showGroundAtmosphere = false;
  // 移动缩放阻尼
  viewer.scene.screenSpaceCameraController.inertiaSpin = 0.8;
  viewer.scene.screenSpaceCameraController.inertiaTranslate = 0.8;
  viewer.scene.screenSpaceCameraController.inertiaZoom = 0.8;
  viewer.scene.skyBox.show = false;
  viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.globe.enableLighting = false;
  viewer.scene.light = new Cesium.DirectionalLight({
    color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
    direction: new Cesium.Cartesian3(6.435314, 135.960521, 700.0),
  });
  viewer.shadows = false;
  // 限制缩放范围
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000;
  // 禁用双击
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  // 深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  // 半透明
  viewer.scene.globe.translucency.enabled = true;
  viewer.scene.globe.translucency.frontFaceAlpha = 0.8;
  // 禁用相机对地形的碰撞
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
  // 相机初始角度
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(113.939565, 22.488431, 1500),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-60),
      roll: 0
    }
  });
  Config.Viewer = viewer;
  emit('callBack');
});
</script>
<style scoped>
#mapContainer {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
  z-index: -2;
}
</style>