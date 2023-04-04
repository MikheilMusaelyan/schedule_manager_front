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


export function putInQueue(toPush: Node[], queue: Node[]) {
    for (let child of toPush) {
      let childChildren = child.children.splice(0) // ???
      queue.push(child);
      if(childChildren.length > 0){
        putInQueue(childChildren, queue) 
      }  
    }
    
}

export function deleteNode(id: number, array: any[]): any {
  let nodeQueue: Node[] = []
  for(let i = 0; i < array.length; i++) {
    if(array[i]?.id == id) { // find the element      
      if(array[i].children.length > 0){ 
        let childrenCopy = array[i].children.slice()
        if(array[i+1]){
          for(let j = 0; j < childrenCopy.length; j++) {
            if(childrenCopy[j].end > array[i+1].start){
              let addToSibling = childrenCopy.splice(j, 1)
              array.splice(i, 1, ...childrenCopy)
              putInQueue(addToSibling, nodeQueue)
              nodeQueue.forEach((e: Node) => {
                newNode(array, e)
              })
              return
            }
            console.log('did not happen br')
          }
        }
        console.log('array[i+1] is not there')
        // there's no next node so our children could not overlap anything
        array.splice(i, 1, ...childrenCopy)
        return
      }
      // node has no children so its children won't be deleted
      array.splice(i, 1)
      return
    }
    deleteNode(id, array[i].children)
  }
}



