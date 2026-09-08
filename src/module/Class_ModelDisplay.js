import Class_Config from "module/Class_Config"

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
                Cesium.Math.toRadians(-15),
                200
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