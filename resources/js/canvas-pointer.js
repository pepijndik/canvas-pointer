import {Konva} from "https://unpkg.com/konva@9/konva.min.js";
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
export default function hotspotImageComponent({ imageUrl, width, height, pointRadius, pointColor, coordinates,state })
{
    return {
        state: state,
        coordinates: coordinates || [],
        tooltip: null,
        tooltipInfo: '',
        imageUrl,
        width,
        height,
        pointRadius,
        pointColor,
        stage: null,
        bodyImage: null,
        init: function({ imageUrl, width, height, pointRadius, pointColor }) {
            this.stage = new Konva.Stage({
                container: this.$refs.containerRef,
                width: width,
                height: height,
            })

            let layer = new Konva.Layer()
            this.stage.add(layer)

            Konva.Image.fromURL(
                imageUrl,
                function(image) {
                    image.setAttrs({
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                    })
                    layer.add(image)
                    layer.draw()
                    this.bodyImage = image
                },
            )

            this.coordinates.forEach(point => {
                let circle = new Konva.Circle({
                    x: point.x,
                    y: point.y,
                    radius: pointRadius,
                    fill: pointColor,
                    stroke: 'black',
                    strokeWidth: 1,
                    id: point.id,
                })

                layer.add(circle)
                circle.draw()

                tippy(circle, {
                    content: point.tooltipInfo,
                    placement: 'top'
                });
            });

            this.stage.on('mousemove', function(e) {
                let pointerPosition = this.stage.getPointerPosition()
                let matched = this.coordinates.find(
                    coord =>
                        Math.pow(coord.x - pointerPosition.x, 2) + Math.pow(coord.y - pointerPosition.y, 2)
                        <= Math.pow(this.pointRadius, 2),
                )

                if (matched) {
                    this.tooltip.setContent(matched.tooltipInfo)
                    this.tooltip.setProps({
                        getReferenceClientRect: () => ({
                            width: 0,
                            height: 0,
                            top: pointerPosition.y,
                            bottom: pointerPosition.y,
                            left: pointerPosition.x,
                            right: pointerPosition.x,
                        }),
                    })
                    this.tooltip.show()
                } else {
                    this.tooltip.hide()
                }
            })

            this.stage.on('mouseout', function() {
                this.tooltip.hide()
            })

            this.stage.on('click', function(e) {
                console.log('CLIKED!!')
                var pointerPosition = this.stage.getPointerPosition()
                var shape = e.target

                if (shape !== this.stage && shape !== this.bodyImage) {
                    shape.destroy()
                    layer.draw()

                    // Remove from the coordinates array
                    this.coordinates = this.coordinates.filter(
                        coord => coord.id !== shape.id(),
                    )
                } else if (shape === this.stage || shape === this.bodyImage) {
                    var circle = new Konva.Circle({
                        x: pointerPosition.x,
                        y: pointerPosition.y,
                        radius: this.pointRadius,
                        fill: this.pointColor,
                        stroke: 'black',
                        strokeWidth: 1,
                        id: Date.now(),
                    })

                    layer.add(circle)
                    layer.draw()

                    // Add to the coordinates array
                    let newCoord = {
                        id: circle.id(),
                        x: pointerPosition.x,
                        y: pointerPosition.y,
                        tooltipInfo: this.tooltipInfo,
                    }
                    this.coordinates.push(newCoord)

                    tippy(circle, {
                        content: newCoord.tooltipInfo,
                        placement: 'top'
                    });
                }
            })
        }
    }
}
