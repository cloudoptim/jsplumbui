let dataB = {
    name: 'Process B',
    nodeList: [
        {
            id: 'nodeA',
            name: 'Process A - Not draggable',
            type: 'task',
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success',
            viewOnly: true
        },
        {
            id: 'nodeB',
            type: 'task',
            name: 'Process B - Node B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error'
        },
        {
            id: 'nodeC',
            name: 'Process B - Node C',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',
            state: 'warning'
        }, 
		{
            id: 'nodeD',
            name: 'Process B - Node D',
            type: 'task',
            left: '723px',
            top: '215px',
            ico: 'el-icon-present',
            state: 'running'
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB',
        label: 'Condition A'
    }, {
        from: 'nodeA',
        to: 'nodeC',
        label: 'Condition B'
    }, {
        from: 'nodeB',
        to: 'nodeD'
    }, {
        from: 'nodeC',
        to: 'nodeD'
    }
    ]
}

export function getDataB () {
    return dataB
}
