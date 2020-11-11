let dataA = {
    name: 'Process A',
    nodeList: [
        {
            id: 'nodeA',
            name: 'Process A - Node A',
            type: 'task',
            left: '26px',
            top: '161px',
            ico: 'el-icon-user-solid'
        },
        {
            id: 'nodeB',
            name: 'Process A- Node B',
            type: 'task',
            left: '340px',
            top: '161px',
            ico: 'el-icon-goods'
        },
        {
            id: 'nodeC',
            name: 'Process C - Node C',
            type: 'task',
            left: '739px',
            top: '161px',
            ico: 'el-icon-present'
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB'
    }, {
        from: 'nodeB',
        to: 'nodeC'
    }]
}

export function getDataA () {
    return dataA
}
