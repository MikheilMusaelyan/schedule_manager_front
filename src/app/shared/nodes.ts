  export let childs: Node[] = []
  let nodesCount: number = 0

  export interface Node {
    start: number;
    end: number;
    children: Node[];
    id: null | number;
    color: any;
    isNew: boolean;
    ID: null | number;
    date?: any;
    state: string;
  }

  export function newNode(children: Node[], node: Node): any {
    let queue: Node[] = [];
    let spliced = false;
    
    if(!node?.id){
      node.id = ++nodesCount
    }
    
    if(children.length == 0) {
      children.push(node)
      return
    }

    for(let i = 0; i < children.length; i++){  
        if(node.start <= children[i].start && node.end >= children[i].end){
          node.children.push(children[i])
          if(spliced == false){ 
            children.splice(i, 1, node);
            spliced = true 
          } else {
            children.splice(i, 1)
            // console.log(children.slice())
            i--
          }
        }
        //tols orivegan vamocmebt, iq ubralod vamocmebt tu grdzelia node (da childs vnestav)
        // da tu arari, anu moklea da chainesteba child shi
        else if(node.start >= children[i].start && node.start < children[i].end) {
          // console.log('node is in child')
          if(children[i].children.length == 0) {
              children[i].children.push(node)
              break
          }
          newNode(children[i].children, node)
          break
        } 

        else if(node.start >= children[i].end && i == (children.length - 1)){
          // console.log('node is the biggest in the children and cant compare to next one')
          children.push(node)
          break
        }

        else if(node.start <= children[i].start && node.end > children[i].start) {
            node.children.push(children[i])
            if(spliced == false){
              children.splice(i, 1, node)
              spliced = true // could even not write because this happens to the last node
                             // is overlapped
            } else {
              children.splice(i, 1)
              i--
            }
            
            if(node.children[node.children.length - 1].children.length > 0) {
                addToQueue(node.end, node.children[node.children.length - 1], queue)
                queue.forEach(element => {
                  newNode(children, element);
                });
                // queue = [] 
                break
            }
            break
        }
        
        else if(node.start < children[i].start && node.end <= children[i].start) {
            // console.log('node doesnt overlap with anything')
            if(spliced == false){
              children.splice(i, 0, node)
            }
            break 
        }

    }
}


export function addToQueue(node: number, child: Node, queue: Node[]) {
    let checkChildren: any[] = child.children

    for (let i = 0; i < checkChildren.length; i++) {
      if(node > checkChildren[i].start) {
        if(node >= checkChildren[i].end || checkChildren[i].children.length == 0){
          continue
        }
        addToQueue(node, checkChildren[i], queue)
      }
      else {
        let toPush = checkChildren.splice(i)
        putInQueue(toPush, queue)
        break
      }
    }
}

export function removeChildren(node: number, child: Node, queue: Node[]) {
  let checkChildren: any[] = child.children

  for (let i = 0; i < checkChildren.length; i++) {
    if(node <= checkChildren[i].start) {
      const childrenCopy = checkChildren.splice(i)
      putInQueue(childrenCopy, queue)
      return
    }
    removeChildren(node, checkChildren[i], queue)
  }
}

export function putInQueue(toPush: Node[], queue: Node[]) {
    for (let child of toPush) {
      let childChildren = child.children.splice(0)      
      queue.push(child);
      if(childChildren.length > 0){
        putInQueue(childChildren, queue) 
      }
    }
}

export function deleteEvent(thisEvent: Node, parent: Node[], index: number) {
  if(!thisEvent.id){
    return
  }
  let nodeQueue: Node[] = []
  if(thisEvent.children.length > 0){ 
    let childrenCopy = thisEvent.children.slice()
    if(parent[index+1]){   
      parent.splice(index, 1)
      putInQueue(childrenCopy, nodeQueue)
      nodeQueue.forEach((e: Node) => {
        newNode(parent, e)
      })
      return   
    }
    parent.splice(index, 1, ...childrenCopy)
    return
  }
  parent.splice(index, 1)
}

export function moveEvent(thisEvent: Node, parent: Node[], index: number) {
  if(!thisEvent.id){
    return
  }
  deleteEvent(thisEvent, parent, index)
  thisEvent.children.splice(0)
  newNode(childs, thisEvent)
}

export function resizeEvent(e: any, thisEvent: Node, parent: Node[], index: number) {
  let queue = []
  if(!e) {
    for(let i = 0; i < thisEvent.children.length; i++) {
      if(thisEvent.end <= thisEvent.children[i].start) {
        const childrenCopy = thisEvent.children.splice(i)
        if(parent[index+1]){
          putInQueue(childrenCopy, queue)
          queue.forEach((e: Node) => {
            newNode(parent, e)
          })
          return
        }
        parent.push(...childrenCopy)
        return
      } else if(thisEvent.end < thisEvent.children[i].end){
        removeChildren(thisEvent.end, thisEvent.children[i], queue)
        queue.forEach((e: Node) => {
          newNode(parent, e)
        })
      }
    }
    return
  };

  for(let i = index + 1; i < parent.length; i++){
    if(thisEvent.end > parent[i].start) {
      const newChildren = parent.splice(i, 1)
      putInQueue(newChildren, queue);
      queue.forEach((e: Node) => {
        newNode(parent, e)
      })
      queue = []
      i--
    } else {
      return
    }
  } 
}

export function setState(ID: number | string, id: number, Children: Node[], type?: string){
  for(let i = 0; i < Children.length; i++){
    if(Children[i].id == id){
      if(typeof(ID) == 'number'){
        if(type == 'move'){
          Children[i].state = 'success'
        } else {
          Children[i].ID = ID
          Children[i].state = 'success'
        }
        let childReference: Node = Children[i]
        setTimeout(() => {
          childReference.state = '' // or find it again
        }, 1500);
        return
      } 
      Children[i].state = 'error'
      return
    }
    setState(ID, id, Children[i].children, type)
  }
}

// newNode(childs, { start: 2, end: 20, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 3, end: 14, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 5, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 
// newNode(childs, { start: 8, end: 10 }) 
// newNode(childs, { start: 8, end: 10, children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: false}) 

