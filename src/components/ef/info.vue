<template>
    <el-dialog
            title="Process Data"
            :visible.sync="dialogVisible"
            width="70%"
    >
        <el-alert
                title="Use instruction"
                type="warning"
                description="Process could be saved, to be loaded in the future"
                show-icon
                close-text="Ok"
        >
        </el-alert>
        <br/>
        <!--Highlighted plugin-->
        <codemirror
                :value="flowJsonData"
                :options="options"
                class="code"
        ></codemirror>
    </el-dialog>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import { codemirror } from 'vue-codemirror'

    require("codemirror/mode/javascript/javascript.js")

    export default {
        props: {
            data: Object,
        },
        data() {
            return {
                dialogVisible: false,
                flowJsonData: {},
                options: {
                    mode: {name: "javascript", json: true},
                    lineNumbers: true
                }
            }
        },
        components: {
            codemirror
        },
        methods: {
            init() {
                this.dialogVisible = true
                this.flowJsonData = JSON.stringify(this.data, null, 4).toString()
            }
        }
    }
</script>
