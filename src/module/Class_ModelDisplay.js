import Class_Config from "module/Class_Config"

// 直接加载
const glbList = [
    {
        name: "地铁13号线宗海",
        url: "./3D/地铁13号线宗海.glb",
        position: {
            lat: 22.488431,
            lon: 113.939565,
            height: -23.941817
        }
    },
    {
        name: "海底隧道1",
        url: "./3D/海底隧道1.glb",
        position: {
            lat: 22.488149,
            lon: 113.939499,
            height: -10.300312
        }
    },
    {
        name: "海底隧道2",
        url: "./3D/海底隧道2.glb",
        position: {
            lat: 22.488392,
            lon: 113.939565,
            height: -8.999351
        }
    },
    {
        name: "码头",
        url: "./3D/码头.glb",
        position: {
            lat: 22.5296786701,
            lon: 113.8840526034,
            height: 0
        }
    },
    {
        name: "港池",
        url: "./3D/港池.glb",
        position: {
            lat: 22.5296261090,
            lon: 113.8838322180,
            height: 0
        }
    },
    {
        name: "疏浚1",
        url: "./3D/疏浚1.glb",
        position: {
            lat: 22.5294043214,
            lon: 113.8838064887,
            height: 0
        }
    },
    {
        name: "疏浚2",
        url: "./3D/疏浚2.glb",
        position: {
            lat: 22.5294438889,
            lon: 113.8840522222,
            height: 0
        }
    },
    {
        name: "疏浚3",
        url: "./3D/疏浚3.glb",
        position: {
            lat: 22.5298648558,
            lon: 113.8839581842,
            height: 0
        }
    }
]
const referenceModel = [
    {
        name: "望海路第二段",
        url: "./3D/望海路第二段.glb",
        position: {
            lat: 22.486711,
            lon: 113.936732,
            height: -14.167878
        }
    },
    {
        name: "望海路第三段",
        url: "./3D/望海路第三段.glb",
        position: {
            lat: 22.489524,
            lon: 113.942043,
            height: -6.772273
        }
    }
]
export default {
    LoadModel(params) {
        // 查找对应模型
        const find = glbList.find(it => it.name === params)
        if (!find) {
            console.warn(`未找到模型: ${params}`)
            return
        }

        const viewer = Class_Config.Viewer
        viewer.entities.removeAll()

        const position = Cesium.Cartesian3.fromDegrees(
            find.position.lon,
            find.position.lat,
            find.position.height
        )

        const entity = viewer.entities.add({
            name: find.name,
            position: position,
            orientation: Cesium.Transforms.headingPitchRollQuaternion(
                position,
                new Cesium.HeadingPitchRoll(
                    Cesium.Math.toRadians(90),
                    Cesium.Math.toRadians(0),
                    Cesium.Math.toRadians(0)
                )
            ),
            model: {
                uri: find.url,
                color: Cesium.Color.fromCssColorString('#00fff3'),
                colorBlendMode: Cesium.ColorBlendMode.MIX,
                colorBlendAmount: 1,
                silhouette: true,
                silhouetteColor: Cesium.Color.fromCssColorString('#00fff3'),
                silhouetteSize: 2,
            }
        })

        viewer.trackedEntity = entity
        viewer.flyTo(entity, {
            duration: 1,
            offset: new Cesium.HeadingPitchRange(
                Cesium.Math.toRadians(345.06),
                Cesium.Math.toRadians(-15)
            )
        });
    },
    LoadReferenceModel() {
        const viewer = Class_Config.Viewer
        referenceModel.forEach(find => {
            const position = Cesium.Cartesian3.fromDegrees(
                find.position.lon,
                find.position.lat,
                find.position.height
            )
            viewer.entities.add({
                name: find.name,
                position: position,
                orientation: Cesium.Transforms.headingPitchRollQuaternion(
                    position,
                    new Cesium.HeadingPitchRoll(
                        Cesium.Math.toRadians(90),
                        Cesium.Math.toRadians(0),
                        Cesium.Math.toRadians(0)
                    )
                ),
                model: {
                    uri: find.url,
                    color: Cesium.Color.fromCssColorString('#5d7a8a'),
                    colorBlendMode: Cesium.ColorBlendMode.MIX,
                    colorBlendAmount: 1,
                    silhouette: true,
                    silhouetteColor: Cesium.Color.fromCssColorString('#3d5560'),
                    silhouetteSize: 2,
                }
            })
        })
    }
}