<template>
    <div class="model-page">
        <template v-if="showSeaInfo">
            <!-- 左侧界址点坐标 -->
            <aside class="sea-left-panel">
                <div class="panel-title">界址点坐标</div>
                <div class="table-scroll coordinate-scroll">
                    <table class="info-table coordinate-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>点号</th>
                                <th>X坐标</th>
                                <th>Y坐标</th>
                                <th>H高程</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in coordinateList" :key="item.name">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.x }}</td>
                                <td>{{ item.y }}</td>
                                <td>{{ item.height }}</td>
                                <td>{{ item.remark || '' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </aside>

            <!-- 右侧宗海基本信息（表格 + 底部附注） -->
            <aside class="sea-right-panel">
                <div class="panel-title">宗海基本信息</div>
                <div class="table-scroll sea-info-scroll">
                    <table class="info-table sea-info-table">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>信息项</th>
                                <th>信息值</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in seaInfoList" :key="item.label">
                                <td>{{ index + 1 }}</td>
                                <td class="info-label-cell">{{ item.label }}</td>
                                <td class="info-value-cell">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表格底部附注 -->
                <div class="remark-box">
                    <div class="remark-title">附注：</div>
                    <div class="remark-item">
                        <span class="remark-label">项目名称：</span>
                        <span class="remark-value">深圳市城市轨道交通13号线二期（南延）工程</span>
                    </div>
                    <div class="remark-item">
                        <span class="remark-label">不动产单元号：</span>
                        <span class="remark-value">440305009001GH00102W00000000</span>
                    </div>
                </div>
            </aside>
        </template>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import Class_ModelDisplay from 'module/Class_ModelDisplay';

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

    return model || '地铁13号线宗海';
})();

// 是否显示宗海信息
const showSeaInfo = computed(() => modelName === '地铁13号线宗海');

// 界址点坐标
const coordinateList = [
    { name: 'K1', x: '2487883.44', y: '493798.62', height: '-15.00' },
    { name: 'K2', x: '2487859.08', y: '493736.02', height: '-15.00' },
    { name: 'K3', x: '2487865.02', y: '493739.12', height: '-15.00' },
    { name: 'K4', x: '2487873.97', y: '493742.87', height: '-15.00' },
    { name: 'K5', x: '2487883.17', y: '493745.93', height: '-15.00' },
    { name: 'K6', x: '2487890.83', y: '493747.99', height: '-15.00' },
    { name: 'K7', x: '2487897.69', y: '493748.54', height: '-15.00' },
    { name: 'K8', x: '2487903.99', y: '493748.05', height: '-15.00' },
    { name: 'K9', x: '2487915.81', y: '493780.36', height: '-15.00' },
    { name: 'K10', x: '2487902.77', y: '493801.68', height: '-15.00' },
    { name: 'K11', x: '2487894.49', y: '493821.65', height: '-15.00' },
    { name: 'K12', x: '2487893.61', y: '493825.93', height: '-15.00' },
    { name: 'K13', x: '2487893.61', y: '493825.93', height: '-30.22' },
    { name: 'K14', x: '2487894.49', y: '493821.65', height: '-30.22' },
    { name: 'K15', x: '2487902.77', y: '493801.68', height: '-30.22' },
    { name: 'K16', x: '2487915.81', y: '493780.36', height: '-30.22' },
    { name: 'K17', x: '2487903.99', y: '493748.05', height: '-30.22' },
    { name: 'K18', x: '2487897.69', y: '493748.54', height: '-30.22' },
    { name: 'K19', x: '2487890.83', y: '493747.99', height: '-30.22' },
    { name: 'K20', x: '2487883.17', y: '493745.93', height: '-30.22' },
    { name: 'K21', x: '2487873.97', y: '493742.87', height: '-30.22' },
    { name: 'K22', x: '2487865.02', y: '493739.12', height: '-30.22' },
    { name: 'K23', x: '2487859.08', y: '493736.02', height: '-30.22' },
    { name: 'K24', x: '2487883.44', y: '493798.62', height: '-30.22' },
];

// 宗海基本信息
const seaInfoList = [
    { label: '宗海权利人', value: '深圳市地铁集团有限公司' },
    { label: '权利设定方式', value: '底土' },
    { label: '用海方式一级类', value: '构筑物' },
    { label: '宗海位置', value: '深圳市南山区后海海域' },
    { label: '用海类型一级类', value: '交通运输用海' },
    { label: '用海方式二级类', value: '跨海桥梁、海底隧道' },
    { label: '宗海用途', value: '交通运输用海' },
    { label: '用海类型二级类', value: '路桥用海' },
    { label: '投影面积', value: '2249.74 m²' },
    { label: '宗海数量', value: '1' },
    { label: '用海空间层', value: '底土层' },
    { label: '体积', value: '34241.00 m³' },
    { label: '宗海面积', value: '0.2249公顷' },
    { label: '高程区间', value: '-30.22～-15.00 m' },
    { label: '用海年限', value: '50年' },
];

onMounted(() => {
    // 获取模型
    Class_ModelDisplay.LoadModel(modelName);

    // 加载参照模型
    Class_ModelDisplay.LoadReferenceModel();
});
</script>

<style lang="less" scoped>
.model-page {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    font-family: "Microsoft YaHei", Arial, sans-serif;
    color: #eaf7ff;
    box-sizing: border-box;

    /* ================= 左侧界址点坐标面板 ================= */
    .sea-left-panel {
        position: absolute;
        top: 0;
        left: 0;
        width: clamp(320px, 22vw, 380px);
        max-height: 72vh;
        display: flex;
        flex-direction: column;
        background: rgba(7, 27, 43, 0.90);
        border: 1px solid rgba(56, 208, 225, 0.55);
        border-radius: 6px;
        box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.30),
            inset 0 0 18px rgba(28, 157, 190, 0.08);
        overflow: hidden;
        box-sizing: border-box;
        pointer-events: auto;

        .panel-title {
            position: relative;
            flex-shrink: 0;
            height: 42px;
            line-height: 42px;
            padding: 0 14px;
            text-align: center;
            font-size: clamp(14px, 0.9vw, 17px);
            font-weight: bold;
            letter-spacing: 2px;
            color: #e9fcff;
            background: linear-gradient(90deg,
                    rgba(9, 77, 103, 0.95),
                    rgba(10, 111, 133, 0.88),
                    rgba(9, 77, 103, 0.95));
            border-bottom: 1px solid rgba(51, 213, 231, 0.55);

            &::before {
                content: "";
                position: absolute;
                left: 14px;
                top: 13px;
                width: 3px;
                height: 16px;
                background: #36e4ee;
                border-radius: 2px;
            }
        }

        .table-scroll {
            width: 100%;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(57, 197, 217, 0.55);
                border-radius: 5px;
            }

            &::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.04);
            }

            &.coordinate-scroll {
                flex: 1;
                min-height: 0;
            }
        }

        .info-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            table-layout: auto;
            font-size: clamp(11px, 0.67vw, 13px);
            white-space: nowrap;

            th,
            td {
                height: 30px;
                padding: 4px 5px;
                text-align: center;
                box-sizing: border-box;
                border-right: 1px solid rgba(115, 184, 201, 0.20);
                border-bottom: 1px solid rgba(115, 184, 201, 0.20);
            }

            th {
                position: sticky;
                top: 0;
                z-index: 2;
                height: 34px;
                color: #7ceaf3;
                font-weight: bold;
                background: rgba(13, 62, 82, 0.98);
                border-bottom: 1px solid rgba(56, 214, 228, 0.45);
            }

            td {
                color: #e2f0f5;
                background: rgba(8, 32, 48, 0.78);
            }

            tbody tr:nth-child(even) td {
                background: rgba(22, 61, 78, 0.85);
            }

            tbody tr:hover td {
                color: #ffffff;
                background: rgba(13, 127, 151, 0.65);
            }

            tr:last-child td {
                border-bottom: none;
            }
        }
    }

    /* ================= 右侧宗海基本信息面板（表格 + 底部附注） ================= */
    .sea-right-panel {
        position: absolute;
        top: 0;
        right: 0;
        width: clamp(300px, 24vw, 420px);
        max-height: 72vh;
        display: flex;
        flex-direction: column;
        background: rgba(7, 27, 43, 0.90);
        border: 1px solid rgba(56, 208, 225, 0.55);
        border-radius: 6px;
        box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.30),
            inset 0 0 18px rgba(28, 157, 190, 0.08);
        overflow: hidden;
        box-sizing: border-box;
        pointer-events: auto;

        .panel-title {
            position: relative;
            flex-shrink: 0;
            height: 42px;
            line-height: 42px;
            padding: 0 14px;
            text-align: center;
            font-size: clamp(14px, 0.9vw, 17px);
            font-weight: bold;
            letter-spacing: 2px;
            color: #e9fcff;
            background: linear-gradient(90deg,
                    rgba(9, 77, 103, 0.95),
                    rgba(10, 111, 133, 0.88),
                    rgba(9, 77, 103, 0.95));
            border-bottom: 1px solid rgba(51, 213, 231, 0.55);

            &::before {
                content: "";
                position: absolute;
                left: 14px;
                top: 13px;
                width: 3px;
                height: 16px;
                background: #36e4ee;
                border-radius: 2px;
            }
        }

        .table-scroll {
            width: 100%;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(57, 197, 217, 0.55);
                border-radius: 5px;
            }

            &::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.04);
            }

            &.sea-info-scroll {
                flex: 1;
                min-height: 0;
            }
        }

        .info-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            table-layout: auto;
            font-size: clamp(11px, 0.67vw, 13px);

            th,
            td {
                height: 30px;
                padding: 4px 8px;
                text-align: center;
                box-sizing: border-box;
                border-right: 1px solid rgba(115, 184, 201, 0.20);
                border-bottom: 1px solid rgba(115, 184, 201, 0.20);
            }

            th {
                position: sticky;
                top: 0;
                z-index: 2;
                height: 34px;
                color: #7ceaf3;
                font-weight: bold;
                background: rgba(13, 62, 82, 0.98);
                border-bottom: 1px solid rgba(56, 214, 228, 0.45);
            }

            td {
                color: #e2f0f5;
                background: rgba(8, 32, 48, 0.78);
            }

            tbody tr:nth-child(even) td {
                background: rgba(22, 61, 78, 0.85);
            }

            tbody tr:hover td {
                color: #ffffff;
                background: rgba(13, 127, 151, 0.65);
            }

            tr:last-child td {
                border-bottom: none;
            }

            .info-label-cell {
                color: #79cbdc;
                font-weight: 500;
                white-space: nowrap;
            }

            .info-value-cell {
                color: #f0f8fb;
                white-space: normal;
                overflow-wrap: anywhere;
                text-align: left;
            }
        }

        /* 表格底部附注 */
        .remark-box {
            flex-shrink: 0;
            padding: 8px 12px 10px;
            font-size: clamp(10px, 0.66vw, 13px);
            line-height: 1.6;
            background: rgba(12, 44, 60, 0.75);
            border-top: 1px solid rgba(56, 208, 225, 0.45);
            box-sizing: border-box;

            .remark-title {
                margin-bottom: 4px;
                font-weight: bold;
                letter-spacing: 1px;
                color: #7ceaf3;
            }

            .remark-item {
                margin-bottom: 4px;
                display: flex;
                flex-wrap: wrap;

                &:last-child {
                    margin-bottom: 0;
                }

                .remark-label {
                    flex-shrink: 0;
                    color: #79cbdc;
                }

                .remark-value {
                    flex: 1;
                    min-width: 0;
                    color: #f0f8fb;
                    font-weight: 500;
                    overflow-wrap: anywhere;
                }
            }
        }
    }

    /* ================= 平板适配 ================= */
    @media screen and (max-width: 1024px) {
        .sea-left-panel {
            width: 40%;
            max-height: 42vh;
        }

        .sea-right-panel {
            width: 44%;
            max-height: 42vh;
        }
    }

    /* ================= 手机适配 ================= */
    @media screen and (max-width: 767px) {
        .sea-left-panel {
            top: 8px;
            left: 8px;
            width: calc(100% - 16px);
            max-height: 30vh;
        }

        .sea-right-panel {
            top: auto;
            bottom: 8px;
            right: 8px;
            width: calc(100% - 16px);
            max-height: 40vh;
        }
    }
}
</style>