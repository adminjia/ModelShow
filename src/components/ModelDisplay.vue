<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Class_ModelDisplay from 'module/Class_ModelDisplay';

const getModelFromURL = () => {
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
            model = match[1];
        }
    }

    // 解码并返回默认值
    return model ? decodeURIComponent(model) : '地铁13号线宗海';
};

onMounted(() => {
    // 获取参数
    const modelName = getModelFromURL();
    // 获取模型
    Class_ModelDisplay.LoadModel(modelName);
    // 加载参照模型
    Class_ModelDisplay.LoadReferenceModel();
});
</script>