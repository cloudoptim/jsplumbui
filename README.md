# jsplumbui

## Introduction
Uses VUE, ElementUI, and JsPlumb to design a process flowchart, and using VueDraggable for adding/dragging node/line implementation

## Features
* Supports drag and drop nodes
* Adding labels to connection lines
* Enables download of flowchart
* Support drag and drop of canvas
* Multiple options on line style, anchor point and custom design override

## Data example
``` json

{
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

```

## Data explanation
name - name of process

## Nodelist explanation
id       - Unique id for each nodes, connection are created between ids , required: yes
name     - Name of node/line , required: yes
type     - Node type, can be processed based on custom added logic , required: yes
left     - X coordinates on canvas, ---px , required: yes
top      - Y coordinates on canvas , required: yes
ico      - Icon design of node , required: yes
state    - Status of node, different status has different icon, Options: success, error, warning, running , required: no
viewOnly - if this value is true, node can't be draggable , required: no

## Linelist explanation
from      - Source node id , required: yes
to        - End node id , required: yes
label     - Labelling on line , required: no
anchors   - Starting anchor point of connection line , Options: ["Top","Right"] | ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle']
            required: no
connector - Line type , Options: ["StateMachine", "Flowchart", "Bezier", "Straight"]

## To build
1. Download code

2. At root of code, find package.json, and ensure the following packages are included
   ```js
    "element-ui": "2.9.1",
    "lodash": "4.17.15",
    "vue": "^2.5.2",
    "vue-codemirror": "^4.0.6",
    "vuedraggable": "2.23.0"
  ```
  
3. Add changes to codes in src/components/ef

4. Edit main.js file, import the following packages
   ```js
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import 'custom code'
  Vue.use(ElementUI, {size: 'small'})
  ```
  
## To deploy dev

``` bash
# 
git clone  https://github.com/cloudoptim/jsplumbui.git

# Install packages
npm install

# Deploy code in dev
npm run dev

# Access
 http://localhost:8080
```

## Easy-flow sdk APIs called
### APIs are currently deployed in the same instance as jsplumbui, located in port 8080, while UI is hosted in port 8081
### /node
* GET /get/{id} - returns a specific node by id
* POST /save - save node into database
``` json
{
    "id": "created by UI",
	"projectId": " currently hardcoded in UI",
	"name": "",
	"type": "",
	"left": "--px",
	"top": "--px",
	"ico": "",
	"state": ""
}
```
* PUT - Update existing node
``` json
{
    "id": "",
	"name": "",
	"type": "",
	"ico": "",
	"state": ""
}
```
* DELETE /{id} - Delete existing node
* PUT /changeSite - Update node position
```json
{
    "id": "",
	"left": "",
	"top": ""
}
``` 

### /line
* POST - Add new connection lines
``` json
{
    "id": "Generated by UI",
    "projectId": "Hardcoded in UI",
    "from": "Id of initial node",
    "to": "Id of ending node",
    "label": "This is optional"	
}
```
* DELETE /{from}/{to} -  Delete existing line between nodes
* PUT /changeLabel - Update labels
``` json
{
    "from": "",
	"to": "",
	"label": ""
}
```

### /project
* GET /{id} - Return project details
* GET /data/{id} - Compiles data between node, line, and project based on Id, and return full json flowchart data
* POST - Create new project
``` json
{
    "id": "Generated by UI",
	"name": ""
}
```
* UPDATE - Update existing project
``` json
{
    "id": "",
	"name": ""
}
```
*DELETE /{id} - Delete existing project

