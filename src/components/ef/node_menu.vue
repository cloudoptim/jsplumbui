<template>
    <div class="flow-menu" ref="tool">
        <div v-for="menu  in  menuList" :key="menu.id">
            <span class="ef-node-pmenu" @click="menu.open = !menu.open"><i :class="{'el-icon-caret-bottom': menu.open,'el-icon-caret-right': !menu.open}"></i>&nbsp;{{menu.name}}</span>
            <ul v-show="menu.open" class="ef-node-menu-ul">
                <draggable @end="end" @start="move" v-model="menu.children" :options="draggableOptions">
                    <li v-for="subMenu in menu.children" class="ef-node-menu-li" :key="subMenu.id" :type="subMenu.type">
                        <i :class="subMenu.ico"></i> {{subMenu.name}}
                    </li>
                </draggable>
            </ul>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'

    var mousePosition = {
        left: -1,
        top: -1
    }

    export default {
        data() {
            return {
                activeNames: '1',
                // draggable options reference: https://www.cnblogs.com/weixin186/p/10108679.html
                draggableOptions: {
                    preventOnFilter: false,
                    sort: false,
                    disabled: false,
                    ghostClass: 'tt',
                    forceFallback: true,
                    // Design when dragging
                    // fallbackClass: 'flow-node-draggable'
                },
                // Default id of left menu
                defaultOpeneds: ['1', '2'],
                menuList: [
                    {
                        id: '1',
                        type: 'group',
                        name: 'Start node',
                        ico: 'el-icon-video-play',
                        open: true,
                        children: [
                            {
                                id: '11',
                                type: 'timer',
                                name: 'Enter Data',
                                ico: 'el-icon-time',
                                // Custom override style
                                style: {}
                            }, {
                                id: '12',
                                type: 'task',
                                name: 'Interface call',
                                ico: 'el-icon-odometer',
                                // Custom override style
                                style: {}
                            }
                        ]
                    },
                    {
                        id: '2',
                        type: 'group',
                        name: 'End node',
                        ico: 'el-icon-video-pause',
                        open: true,
                        children: [
                            {
                                id: '21',
                                type: 'end',
                                name: 'End process',
                                ico: 'el-icon-caret-right',
                                // Custom override style
                                style: {}
                            }, {
                                id: '22',
                                type: 'over',
                                name: 'Cleanup data',
                                ico: 'el-icon-shopping-cart-full',
                                // Custom style
                                style: {}
                            }
                        ]
                    }
                ],
                nodeMenu: {}
            }
        },
        components: {
            draggable
        },
        created() {
            /**
             * To solve tab page popping up on firefox 
             * @param event
             */
            if (this.isFirefox()) {
                document.body.ondrop = function (event) {
                    // To solve firefox error where mouse could not get coordinates
                    mousePosition.left = event.layerX
                    mousePosition.top = event.clientY - 50
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        },
        methods: {
            getMenuByType(type) {
                for (let i = 0; i < this.menuList.length; i++) {
                    let children = this.menuList[i].children;
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].type === type) {
                            return children[j]
                        }
                    }
                }
            },
            move(evt, a, b, c) {
                var type = evt.item.attributes.type.nodeValue
                this.nodeMenu = this.getMenuByType(type)
            },
            end(evt, e) {
                this.$emit('addNode', evt, this.nodeMenu, mousePosition)
            },
            isFirefox() {
                var userAgent = navigator.userAgent
                if (userAgent.indexOf("Firefox") > -1) {
                    return true
                }
                return false
            }
        }
    }
</script>
