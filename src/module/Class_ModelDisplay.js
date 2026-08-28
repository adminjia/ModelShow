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
                    Cesium.Math.toRadians(90), // heading: 绕Z轴旋转，调整朝向
                    Cesium.Math.toRadians(0),   // pitch: 俯仰
                    Cesium.Math.toRadians(0)    // roll: 翻滚
                )
            ),
            model: {
                uri: find.url,
                minimumPixelSize: 128,
                maximumScale: 20000
            }
        })

        viewer.trackedEntity = entity
        viewer.flyTo(entity)
    }
}