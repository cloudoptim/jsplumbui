var dataD = {
    name: 'Process D',
    nodeList: [
        {
            id: 'nodeA',
            name: 'Process D - Node A',
            type: 'task',
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success'
        },
        {
            id: 'nodeB',
            type: 'task',
            name: 'Process D - Node B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error'
        },
        {
            id: 'nodeC',
            name: 'Process D - Node C',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',
            state: 'warning'
        }, {
            id: 'nodeD',
            name: 'Process D - Node D',
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
        label: 'Straight line, custom line style, fixed point',
        connector: 'Straight',
        anchors: ['Top', 'Bottom'],
        paintStyle: {strokeWidth: 2, stroke: '#1879FF'}
    }, {
        from: 'nodeA',
        to: 'nodeC',
        label: 'Bezier curve,fixed point',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    }, {
        from: 'nodeB',
        to: 'nodeD',
        label: 'Default connection style,movable point'
    }, {
        from: 'nodeC',
        to: 'nodeD',
        label: 'Default connection style,movable point'
    }, {
        from: 'nodeC',
        to: 'nodeC',
        label: 'Self connection'
    }
    ]
}

export function getDataD() {
    return dataD
}
