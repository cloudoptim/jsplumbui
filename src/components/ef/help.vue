<template>
    <el-dialog
            title="Help"
            :visible.sync="dialogVisible"
            width="70%"
            customClass="flowHelp"
    >
        <el-tabs tab-position="left">
            <el-tab-pane label="How to add">
                <el-divider content-position="left">How to add</el-divider>
                <div>Choose the desired node type on left side of page, drag and drop to canvas</div>
            </el-tab-pane>
            <el-tab-pane label="How to delete">
                <el-divider content-position="left">Page Delete</el-divider>
                <div>
                    Choose the node to be deleted, and then press the delete icon in the top left corner
                </div>
                <el-divider content-position="left">Delete through code</el-divider>
                <pre>this.deleteNode(nodeId)</pre>
            </el-tab-pane>
            <el-tab-pane label="How to move">
                <el-divider content-position="left">How to move</el-divider>
                <div>Hover mouse over node, when it changes to the + symbol, click and drag, then release in new location</div>
            </el-tab-pane>
            <el-tab-pane label="How to connect">
                <el-divider content-position="left">How to connect</el-divider>
                <div>Hover over icon on left side of node, when it changes to + symbol,click and drag to the destination node</div>
            </el-tab-pane>
            <el-tab-pane label="How to add conditions">
                <el-divider content-position="left">How to add conditions</el-divider>
                <div>Click on the desired connection line, a panel will appear on the right side, enter condition and press 【Save】</div>
            </el-tab-pane>
            <el-tab-pane label="How to setup interactive backend storage">
                <el-divider content-position="left">How to setup interactive backend storage</el-divider>
                <div>Refer: https://gitee.com/xiaoka2017/easy-flow-sdk</div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false
            }
        },
        components: {},
        methods: {
            init() {
                this.dialogVisible = true
            }
        }
    }
</script>

<style>
    .flowHelp {
        height: 80%;
    }
</style>
