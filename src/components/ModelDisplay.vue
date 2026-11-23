<template>
    <div>
        <!-- 面板 -->
        <MetroLineThirteen v-if="showSeaInfo"></MetroLineThirteen>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import Class_ModelDisplay from 'module/Class_ModelDisplay';
import MetroLineThirteen from 'components/panel/MetroLineThirteen.vue'

// 获取地址栏模型名称
const modelName = (() => {
    const params = new URLSearchParams(window.location.search);
    let model = params.get('model');

    if (!model) {
        const hash = window.location.hash;
        if (hash.includes('?')) {
            const hashParams = new URLSearchParams(hash.split('?')[1]);
            model = hashParams.get('model');
        }
    }

    if (!model) {
        const match = window.location.href.match(/[?&]model=([^&#]*)/);
        if (match) {
            model = decodeURIComponent(match[1]);
        }
    }

    return model;
})();

// 是否显示宗海信息
const showSeaInfo = computed(() => modelName === '地铁13号线宗海');

// 普通加载
const nameList = ['地铁13号线宗海', '海底隧道1', '海底隧道2']

// 加载模型
const loadGlb = () => {
    if (modelName) {
        // 获取模型
        Class_ModelDisplay.LoadModel(modelName);
        if (nameList.includes(modelName)) {
            // 加载参照模型
            Class_ModelDisplay.LoadReferenceModel();
        }
    }
}

onMounted(() => {
    loadGlb()
});
</script>