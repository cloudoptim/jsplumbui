<template>
    <div v-if="easyFlowVisible" style="height: calc(100vh);">
        <el-row>
            <!--Top toolbar menu-->
            <el-col :span="24">
                <div class="ef-tooltar">
                    <el-link type="primary" :underline="false">{{data.name}}</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-delete" size="large" @click="deleteElement" :disabled="!this.activeElement.type"></el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-download" size="large" @click="downloadData"></el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-plus" size="large" @click="zoomAdd"></el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-minus" size="large" @click="zoomSub"></el-button>
                    <div style="float: right;margin-right: 5px">
                        <el-button type="info" plain round icon="el-icon-document" @click="dataInfo" size="mini">Process information</el-button>
                        <el-button type="primary" plain round @click="dataReloadA" icon="el-icon-refresh" size="mini">Switch process A</el-button>
                        <el-button type="primary" plain round @click="dataReloadB" icon="el-icon-refresh" size="mini">Switch process B</el-button>
                        <el-button type="primary" plain round @click="dataReloadC" icon="el-icon-refresh" size="mini">Swithc process C</el-button>
                        <el-button type="primary" plain round @click="dataReloadD" icon="el-icon-refresh" size="mini">Custom design</el-button>
                        <el-button type="info" plain round icon="el-icon-document" @click="openHelp" size="mini">Help</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div style="display: flex;height: calc(100% - 47px);">
            <div style="width: 230px;border-right: 1px solid #dce3e8;">
                <node-menu @addNode="addNode" ref="nodeMenu"></node-menu>
            </div>
            <div id="efContainer" ref="efContainer" class="container" v-flowDrag>
                <template v-for="node in data.nodeList">
                    <flow-node
                            :id="node.id"
                            :key="node.id"
                            :node="node"
                            :activeElement="activeElement"
                            @changeNodeSite="changeNodeSite"
                            @nodeRightMenu="nodeRightMenu"
                            @clickNode="clickNode"
                    >
                    </flow-node>
                </template>
                <!-- Default width and height for canvas -->
                <div style="position:absolute;top: 2000px;left: 2000px;">&nbsp;</div>
            </div>
            <!-- Right menu -->
            <div style="width: 300px;border-left: 1px solid #dce3e8;background-color: #FBFBFB">
                <flow-node-form ref="nodeForm" @setLineLabel="setLineLabel" @repaintEverything="repaintEverything"></flow-node-form>
            </div>
        </div>
        <!-- Process details -->
        <flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data"></flow-info>
        <flow-help v-if="flowHelpVisible" ref="flowHelp"></flow-help>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    // import { jsPlumb } from 'jsplumb'
    // Use modified jsplumb
    import './jsplumb'
    import { easyFlowMixin } from '@/components/ef/mixins'
    import flowNode from '@/components/ef/node'
    import nodeMenu from '@/components/ef/node_menu'
    import FlowInfo from '@/components/ef/info'
    import FlowHelp from '@/components/ef/help'
    import FlowNodeForm from './node_form'
    import lodash from 'lodash'
	//import Vue from 'vue'
    //import axios from 'axios'
    //import VueAxios from 'vue-axios'
    import { getDataA } from './data_A'
    import { getDataB } from './data_B'
    import { getDataC } from './data_C'
    import { getDataD } from './data_D'
	
	const axios = require('axios');

    export default {
        data() {
            return {
                jsPlumb: null,
                easyFlowVisible: true,
                flowInfoVisible: false,
                loadEasyFlowFinish: false,
                flowHelpVisible: false,
                data: {},
                activeElement: {
                    // Options: node 、line
                    type: undefined,
                    nodeId: undefined,
                    sourceId: undefined,
                    targetId: undefined
                },
                zoom: 0.5
            }
        },
        // Basic configurations
        mixins: [easyFlowMixin],
        components: {
            draggable, flowNode, nodeMenu, FlowInfo, FlowNodeForm, FlowHelp
        },
        directives: {
            'flowDrag': {
                bind(el, binding, vnode, oldNode) {
                    if (!binding) {
                        return
                    }
                    el.onmousedown = (e) => {
                        if (e.button == 2) {
                            // ignore right click
                            return
                        }
                        //  on mouse click
                        let disX = e.clientX
                        let disY = e.clientY
                        el.style.cursor = 'move'

                        document.onmousemove = function (e) {
                            e.preventDefault()
                            const left = e.clientX - disX
                            disX = e.clientX
                            el.scrollLeft += -left

                            const top = e.clientY - disY
                            disY = e.clientY
                            el.scrollTop += -top
                        }

                        document.onmouseup = function (e) {
                            el.style.cursor = 'auto'
                            document.onmousemove = null
                            document.onmouseup = null
                        }
                    }
                }
            }
        },
        mounted() {
            this.jsPlumb = jsPlumb.getInstance()
            this.$nextTick(() => {
                // Default is process A, will reload based on chosen option
                this.dataReloadA()
            })
        },
        methods: {
            getUUID() {
                return Math.random().toString(36).substr(3, 10)
            },
            jsPlumbInit() {
                this.jsPlumb.ready(() => {
                    this.jsPlumb.importDefaults(this.jsplumbSetting)
                    this.jsPlumb.setSuspendDrawing(false, true);
					//console.log("PID: ", project_id);
                    this.loadEasyFlow()
                    // Reference, https://www.cnblogs.com/ysx215/p/7615677.html
                    this.jsPlumb.bind('click', (conn, originalEvent) => {
                        this.activeElement.type = 'line'
                        this.activeElement.sourceId = conn.sourceId
                        this.activeElement.targetId = conn.targetId
                        this.$refs.nodeForm.lineInit({
                            from: conn.sourceId,
                            to: conn.targetId,
                            label: conn.getLabel()
                        })
                    })
                    this.jsPlumb.bind("connection", (evt) => {
                        let from = evt.source.id
                        let to = evt.target.id
						//let lineId = this.getUUID()
                        if (this.loadEasyFlowFinish) {
                            this.data.lineList.push({from: from, to: to})
							axios.post('http://localhost:8080/line', {
							    id: evt.connection.id,
                                from: from,
                                to: to,
								label: "",
                                projectId: "1"
							}
							).then((response) => {
                                console.log(response.data)
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                        }
                    })

                    this.jsPlumb.bind("connectionDetached", (evt) => {
                        this.deleteLine(evt.sourceId, evt.targetId)
                    })

                    this.jsPlumb.bind("connectionMoved", (evt) => {
                        this.changeLine(evt.originalSourceId, evt.originalTargetId)
                    })

                    this.jsPlumb.bind("contextmenu", (evt) => {
                        console.log('contextmenu', evt)
                    })

                    this.jsPlumb.bind("beforeDrop", (evt) => {
                        let from = evt.sourceId
                        let to = evt.targetId
                        if (from === to) {
                            this.$message.error('Node does not support selft connection')
                            return false
                        }
                        if (this.hasLine(from, to)) {
                            this.$message.error('There is an existing relationship, please remove before adding')
                            return false
                        }
                        if (this.hashOppositeLine(from, to)) {
                            this.$message.error('Does not support loopback between 2 nodes');
                            return false
                        }
                        this.$message.success('Successfully connected')
                        return true
                    })

                    // beforeDetach
                    this.jsPlumb.bind("beforeDetach", (evt) => {
                        console.log('beforeDetach', evt)
                    })
                    this.jsPlumb.setContainer(this.$refs.efContainer)
                })
            },
            // Load flow chart
            loadEasyFlow() {
                // Initialize node
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    // Set source point node, drag to connect to other nodes
                    this.jsPlumb.makeSource(node.id, lodash.merge(this.jsplumbSourceOptions, {}))
                    // // Set endpoint node, all other source point can connect to this node
                    this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
                    if (!node.viewOnly) {
                        this.jsPlumb.draggable(node.id, {
                            containment: 'parent',
                            stop: function (el) {
                                // After dragging node into canvas
                                console.log('End drag: ', el)
                            }
                        })
                    }
                }
                // Initialize connection 
                for (var i = 0; i < this.data.lineList.length; i++) {
                    let line = this.data.lineList[i]
                    var connParam = {
                        source: line.from,
                        target: line.to,
                        label: line.label ? line.label : '',
                        connector: line.connector ? line.connector : '',
                        anchors: line.anchors ? line.anchors : undefined,
                        paintStyle: line.paintStyle ? line.paintStyle : undefined,
                    }
                    this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
                }
                this.$nextTick(function () {
                    this.loadEasyFlowFinish = true
                })
            },
            // Set connection conditions
            setLineLabel(from, to, label) {
                var conn = this.jsPlumb.getConnections({
                    source: from,
                    target: to
                })[0]
                if (!label || label === '') {
                    conn.removeClass('flowLabel')
                    conn.addClass('emptyFlowLabel')
                } else {
                    conn.addClass('flowLabel')
                }
                conn.setLabel({
                    label: label,
                })
                this.data.lineList.forEach(function (line) {
                    if (line.from == from && line.to == to) {
                        line.label = label
                    }
                })

            },
            // Delete active element
            deleteElement() {
                if (this.activeElement.type === 'node') {
                    this.deleteNode(this.activeElement.nodeId)
                } else if (this.activeElement.type === 'line') {
                    this.$confirm('Confirm delete line?', 'Prompt', {
                        confirmButtonText: 'Confirm',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }).then(() => {
                        var conn = this.jsPlumb.getConnections({
                            source: this.activeElement.sourceId,
                            target: this.activeElement.targetId
                        })[0]
                        this.jsPlumb.deleteConnection(conn)
                    }).catch(() => {
                    })
                }
            },
            deleteLine(from, to) {
                this.data.lineList = this.data.lineList.filter(function (line) {
                    if (line.from == from && line.to == to) {
					    axios.delete('http://localhost:8080/line/'+from+'/'+to
							).then((response) => {
                                console.log("Deleted line: ", from , 'to', to);
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                        return false
                    }
                    return true
                })
            },
            changeLine(oldFrom, oldTo) {
                this.deleteLine(oldFrom, oldTo)
            },
            changeNodeSite(data) {
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    if (node.id === data.nodeId) {
					    node.left = data.left
                        node.top = data.top
					    axios.put('http://localhost:8080/node', {
							    id: node.id,
                                left: node.left + 'px',
                                top: node.top + 'px',
							}
					    ).then((response) => {
                            console.log(response.data)
                        })
					    .catch(function (error) {
                            console.log(error);
                        });   
                    }
                }
            },
            /**
             * Add a new node after dragging
             * @param evt
             * @param nodeMenu 
             * @param mousePosition
             */
            addNode(evt, nodeMenu, mousePosition) {
                var screenX = evt.originalEvent.clientX, screenY = evt.originalEvent.clientY
                let efContainer = this.$refs.efContainer
                var containerRect = efContainer.getBoundingClientRect()
                var left = screenX, top = screenY
                // Calculate whether to drag into container
                if (left < containerRect.x || left > containerRect.width + containerRect.x || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
                    this.$message.error("Please drag node into canvas")
                    return
                }
                left = left - containerRect.x + efContainer.scrollLeft
                top = top - containerRect.y + efContainer.scrollTop
                // Centered
                left -= 85
                top -= 16
                var nodeId = this.getUUID()
                // Dynamic name generator
                var origName = nodeMenu.name
                var nodeName = origName
                var index = 1
                while (index < 10000) {
                    var repeat = false
                    for (var i = 0; i < this.data.nodeList.length; i++) {
                        let node = this.data.nodeList[i]
                        if (node.name === nodeName) {
                            nodeName = origName + index
                            repeat = true
                        }
                    }
                    if (repeat) {
                        index++
                        continue
                    }
                    break
                }
                var node = {
                    id: nodeId,
                    name: nodeName,
                    type: nodeMenu.type,
                    left: left + 'px',
                    top: top + 'px',
                    ico: nodeMenu.ico,
                    state: 'success',
					projectId: "1"
                }
                /**
                 * Business logic, to decide whether node could be added
                 */
                this.data.nodeList.push(node)
				axios.post('http://localhost:8080/node', {
							    id: nodeId,
                                name: nodeName,
                                type: nodeMenu.type,
                                left: left + 'px',
                                top: top + 'px',
                                ico: nodeMenu.ico,
                                state: "success",
                                projectId: node.projectId
							}
							).then((response) => {
                                console.log(response.data)
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                this.$nextTick(function () {
                    this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
                    this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
                    this.jsPlumb.draggable(nodeId, {
                        containment: 'parent',
                        stop: function (el) {
                            // Message after drag ends
                            console.log('Drag ends: ', el)
                        }
                    })
                })
            },
            /**
             * Delete node
             * @param nodeId 
             */
            deleteNode(nodeId) {
                this.$confirm('Confirm delete node ' + nodeId + '?', 'prompt', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    /**
                     * Decide whether node could be deleted
                     */
                    this.data.nodeList = this.data.nodeList.filter(function (node) {
                        if (node.id === nodeId) {
                            // False delete, node is hidden, to prevent nodes from being moved around
                            // node.show = false
							axios.delete('http://localhost:8080/node/'+node.id
							).then((response) => {
                                console.log("Deleted node: ", nodeId);
								//return false
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                            return false
                        }
                        return true
                    })
                    this.$nextTick(function () {
                        this.jsPlumb.removeAllEndpoints(nodeId);
                    })
                }).catch(() => {
                })
                return true
            },
            clickNode(nodeId) {
                this.activeElement.type = 'node'
                this.activeElement.nodeId = nodeId
                this.$refs.nodeForm.nodeInit(this.data, nodeId)
            },
            hasLine(from, to) {
                for (var i = 0; i < this.data.lineList.length; i++) {
                    var line = this.data.lineList[i]
                    if (line.from === from && line.to === to) {
                        return true
                    }
                }
                return false
            },
            hashOppositeLine(from, to) {
                return this.hasLine(to, from)
            },
            nodeRightMenu(nodeId, evt) {
                this.menu.show = true
                this.menu.curNodeId = nodeId
                this.menu.left = evt.x + 'px'
                this.menu.top = evt.y + 'px'
            },
            repaintEverything() {
                this.jsPlumb.repaint()
            },
            dataInfo() {
                this.flowInfoVisible = true
                this.$nextTick(function () {
                    this.$refs.flowInfo.init()
                })
            },
            dataReload(data) {
                this.easyFlowVisible = false
                this.data.nodeList = []
                this.data.lineList = []
                this.$nextTick(() => {
                    data = lodash.cloneDeep(data)
                    this.easyFlowVisible = true
                    this.data = data
                    this.$nextTick(() => {
                        this.jsPlumb = jsPlumb.getInstance()
                        this.$nextTick(() => {
                            this.jsPlumbInit()
                        })
                    })
                })
            },
            dataReloadA() {
			    axios.get('http://localhost:8080/project/data/1'
							).then((response) => {
							    console.log(response.data.data)
                                this.dataReload(response.data.data)
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                //this.dataReload(getDataA())
            },
            dataReloadB() {
			axios.get('http://localhost:8080/project/data/2'
							).then((response) => {
                                this.dataReload(response.data.data)
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                //this.dataReload(getDataB())
            },
            dataReloadC() {
			axios.get('http://localhost:8080/project/data/3'
							).then((response) => {
                                this.dataReload(response.data.data)
                            })
							.catch(function (error) {
                                console.log(error);
                            });
                //this.dataReload(getDataC())
            },
            dataReloadD() {
                this.dataReload(getDataD())
            },
            zoomAdd() {
                if (this.zoom >= 1) {
                    return
                }
                this.zoom = this.zoom + 0.1
                this.$refs.efContainer.style.transform = `scale(${this.zoom})`
                this.jsPlumb.setZoom(this.zoom)
            },
            zoomSub() {
                if (this.zoom <= 0) {
                    return
                }
                this.zoom = this.zoom - 0.1
                this.$refs.efContainer.style.transform = `scale(${this.zoom})`
                this.jsPlumb.setZoom(this.zoom)
            },
            downloadData() {
                this.$confirm('Confirm download data？', 'Prompt', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, '\t'));
                    var downloadAnchorNode = document.createElement('a')
                    downloadAnchorNode.setAttribute("href", datastr);
                    downloadAnchorNode.setAttribute("download", 'data.json')
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                    this.$message.success("Downloading, please wait...")
                }).catch(() => {
                })
            },
            openHelp() {
                this.flowHelpVisible = true
                this.$nextTick(function () {
                    this.$refs.flowHelp.init()
                })
            }
        }
    }
</script>
