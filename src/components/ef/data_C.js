let dataC = {
    name: 'Process C',
    nodeList: [
        {
            id: 'nodeA',
            name: 'Process C - Node A',
            type: 'task',
            left: '400px',
            top: '15px',
            ico: 'el-icon-user-solid'
        },
        {
            id: 'nodeB',
            name: 'Process C - Node B',
            type: 'task',
            left: '400px',
            top: '200px',
            ico: 'el-icon-goods'
        },
        {
            id: 'nodeC',
            name: 'Process C - Node C',
            type: 'task',
            left: '400px',
            top: '378px',
            ico: 'el-icon-present'
        }
    ],
    lineList: [
        {
            from: 'nodeA',
            to: 'nodeB'
        }, {
            from: 'nodeB',
            to: 'nodeC'
        }
    ]
}

export function getDataC () {
    return dataC
}
