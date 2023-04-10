export let childs: Node[] = []

 export interface Node {
    start: number;
    end: number;
    children: Node[];
    id?: number;
  }

  let nodesCount: number = 0

  export function newNode(children: Node[], node: Node): any {
    
    if(!node?.id){
      node.id = ++nodesCount
    }

    let queue: Node[] = []
    let spliced = false
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
              i-- // gind kofila gind ara
            }
            
            if(node.children[node.children.length - 1].children.length > 0) {
                addToQueue(node.end, node.children[node.children.length - 1], queue)
                queue.forEach(element => {
                  //????? children or childs
                   newNode(children, element);
                  //?????
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
    // console.log('added to queue: ', checkChildren.slice())

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


newNode(childs, { start: 2, end: 20, children: []}) 
newNode(childs, { start: 3, end: 14, children: []}) 
newNode(childs, { start: 5, end: 10, children: []}) 
newNode(childs, { start: 8, end: 10, children: []}) 
newNode(childs, { start: 8, end: 10, children: []}) 
newNode(childs, { start: 8, end: 10, children: []}) 

newNode(childs, { start: 8, end: 10, children: []}) 
newNode(childs, { start: 8, end: 10, children: []}) 

newNode(childs, { start: 8, end: 10, children: []}) 

newNode(childs, { start: 8, end: 10, children: []}) 

newNode(childs, { start: 8, end: 10, children: []}) 



// export function deleteNode(id: number | undefined, array: any[]): any {
//   if(!id){
//     return
//   }
//   let nodeQueue: Node[] = []
//   for(let i = 0; i < array.length; i++) {
//     if(array[i]?.id == id) {    
//       if(array[i].children.length > 0){ 
//         let childrenCopy = array[i].children.slice()
//         if(array[i+1]){   
//           array.splice(i, 1)
//           putInQueue(childrenCopy, nodeQueue)
//           nodeQueue.forEach((e: Node) => {
//             newNode(array, e)
//           })
//           return   
//         }
//         array.splice(i, 1, ...childrenCopy)
//         return
//       }
//       array.splice(i, 1)
//       return
//     }
//     deleteNode(id, array[i].children)
//   }
// }

// export function MoveNode(node: Node) {
//   deleteNode(node?.id, childs)
//   node.children.splice(0)
//   newNode(childs, node)
// }

// export function resizeNode(id: number, array: Node[], increased: boolean) {
//   let queue = []
//   let foundNode: any;
//   for(let i = 0; i < array.length; i++) {
//     if(array[i]?.id == id || foundNode) {
//       foundNode = array[i]
//       if(!increased) {
//       }
//     } 
//     else {
//       resizeNode(id, array[i].children, increased)
//     }
//   }
// }



