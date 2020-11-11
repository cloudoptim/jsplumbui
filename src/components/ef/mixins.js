export const easyFlowMixin = {
    data() {
        return {
            jsplumbSetting: {
                // Dynamic point, adaptive positioning
                Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
                // Container ID
                Container: 'efContainer',
                // Connecting line design，available choices:  StateMachine、Flowchart，Bezier、Straight
                Connector: ['Bezier', {curviness: 100}],
                // Connector: ['Straight', {stub: 20, gap: 1}],
                // Connector: ['Flowchart', {stub: 30, gap: 1, alwaysRespectStubs: false, midpoint: 0.5, cornerRadius: 10}],
                // Connector: ['StateMachine', {margin: 5, curviness: 10, proximityLimit: 80}],
                // Cursor could not remove connections
                ConnectionsDetachable: false,
                // Node could not be removed when lines are deleted
                DeleteEndpointsOnDetach: false,
                /**
                 * Design of the 2 endpoint in a connecting line： dot
                 */
                // Endpoint: ['Dot', {radius: 5, cssClass: 'ef-dot', hoverClass: 'ef-dot-hover'}],
                /**
                 * Design of the 2 endpoint in a connecting line： rectangle
                 */
                // Endpoint: ['Rectangle', {height: 20, width: 20, cssClass: 'ef-rectangle', hoverClass: 'ef-rectangle-hover'}],
                /**
                 * Connecting line endpoint image
                 */
                // Endpoint: ['Image', {src: 'https://www.easyicon.net/api/resizeApi.php?id=1181776&size=32', cssClass: 'ef-img', hoverClass: 'ef-img-hover'}],
                /**
                 * Blank endpoint design
                 */
                Endpoint: ['Blank', {Overlays: ''}],
                // Endpoints: [['Dot', {radius: 5, cssClass: 'ef-dot', hoverClass: 'ef-dot-hover'}], ['Rectangle', {height: 20, width: 20, cssClass: 'ef-rectangle', hoverClass: 'ef-rectangle-hover'}]],
                /**
                 * Connecting line endpoint style
                 */
                EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1},
                // jsPlumb internal logging
                LogEnabled: true,
                /**
                 * Connecting line paint style
                 */
                PaintStyle: {
                    // color
                    stroke: '#E0E3E7',
                    // thickness
                    strokeWidth: 1,
                    // outline design，refererence: https://blog.csdn.net/roymno2/article/details/72717101
                    outlineStroke: 'transparent',
                    // outline thickness
                    outlineWidth: 10
                },
                DragOptions: {cursor: 'pointer', zIndex: 2000},
                /**
                 *  Overlay reference： https://www.jianshu.com/p/d9e9918fd928
                 */
                Overlays: [
                    // Arrow cursor overlay
                    ['Arrow', {
                        width: 10, 
                        length: 8, 
                        location: 1, // recommended between 0 ~ 1
                        direction: 1, // 1 is forward, -1 is backwards
                        foldback: 0.623 
                    }],
                    // ['Diamond', {
                    //     events: {
                    //         dblclick: function (diamondOverlay, originalEvent) {
                    //             console.log('double click on diamond overlay for : ' + diamondOverlay.component)
                    //         }
                    //     }
                    // }],
                    ['Label', {
                        label: '',
                        location: 0.1,
                        cssClass: 'aLabel'
                    }]
                ],
                // Render option svg、canvas
                RenderMode: 'svg',
                // Cursor design when hovering over lines
                HoverPaintStyle: {stroke: '#b0b2b5', strokeWidth: 1},
                // Cursor when hovering over endpoint
                // EndpointHoverStyle: {fill: 'red'}
                Scope: 'jsPlumb_DefaultScope' // Only similar scope could be connected
            },
            /**
             * Connection parameters
             */
            jsplumbConnectOptions: {
                isSource: true,
                isTarget: true,
                // Dynamic point, 4 direction: Continuous、AutoDefault
                anchor: 'Continuous',
                // Label style of connecting lines
                labelStyle: {
                    cssClass: 'flowLabel'
                },
                // Modified original jsplumb code to enable custom style on empty label
                emptyLabelStyle: {
                    cssClass: 'emptyFlowLabel'
                }
            },
            /**
             * Source configuration parameters
             */
            jsplumbSourceOptions: {
                // Set the draggable class name, as long as the mouse moves to the DOM on the class name, connection could be drag
                filter: '.flow-node-drag',
                filterExclude: false,
                anchor: 'Continuous',
                allowLoopback: true,
                maxConnections: -1,
                onMaxConnections: function (info, e) {
                    console.log(`超过了最大值连线: ${info.maxConnections}`)
                }
            },
            // Refer https://www.cnblogs.com/mq0036/p/7942139.html
            jsplumbSourceOptions2: {
                // Set the draggable class name, as long as the mouse moves to the DOM on the class name, connection could be drag
                filter: '.flow-node-drag',
                filterExclude: false,
                // anchor: 'Continuous',
                allowLoopback: true,
                connector: ['Flowchart', {curviness: 50}],
                connectorStyle: {
                    stroke: 'red',
                    strokeWidth: 1,
                    // Refer https://blog.csdn.net/roymno2/article/details/72717101
                    outlineStroke: 'transparent',
                    outlineWidth: 10
                },
                connectorHoverStyle: {stroke: 'red', strokeWidth: 2}
            },
            jsplumbTargetOptions: {
                // Set the draggable class name, as long as the mouse moves to the DOM on the class name, connection could be drag
                filter: '.flow-node-drag',
                filterExclude: false,
                anchor: 'Continuous',
                allowLoopback: true,
                dropOptions: {hoverClass: 'ef-drop-hover'}
            }
        }
    }
}
