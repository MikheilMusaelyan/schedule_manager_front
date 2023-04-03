export let childs: Node[] = []

 export interface Node {
    start: number;
    end: number;
    children: Node[];
  }

  export function newNode(children: Node[], node: Node) {
    queue = []
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
            console.log(children.slice())
            i--
          }
        }
        //tols orivegan vamocmebt, iq ubralod vamocmebt tu grdzelia node (da childs vnestav)
        // da tu arari, anu moklea da chainesteba child shi
        else if(node.start >= children[i].start && node.start < children[i].end) {
          console.log('node is in child')
          if(children[i].children.length == 0) {
              children[i].children.push(node)
              return
          }
          newNode(children[i].children, node)
          return
        } 

        else if(node.start >= children[i].end && i == (children.length - 1)){
          console.log('node is the biggest in the children and cant compare to next one')
          children.push(node)
          return
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
                addToQueue(node.end, node.children[node.children.length - 1])
                queue.forEach(element => {
                  newNode(childs, element)
                })
                // queue = [] 
                return
            }
            return
        }
        
        else if(node.start < children[i].start && node.end <= children[i].start) {
            console.log('node doesnt overlap with anything')
            if(spliced == false){
              children.splice(i, 0, node)
            }
            return 
        }

    }
}


export function addToQueue(node: number, child: Node) {
    let checkChildren: any[] = child.children

    console.log('added to queue: ', checkChildren.slice())

    for (let i = 0; i < checkChildren.length; i++) {
      
      if(node > checkChildren[i].start) {
        // if(node >= checkChildren[i].end || checkChildren[i].children.length == 0){}
        addToQueue(node, checkChildren[i])
      }
      else {
        let toPush = checkChildren.splice(i)
        putInQueue(toPush)
        break
      }
    }
}

let queue: Node[] = []

export function putInQueue(toPush: Node[]) {
    for (let child of toPush) {
      let childChildren = child.children.splice(0)
      queue.push(child);
      if(childChildren.length > 0){
        putInQueue(childChildren) 
      }  
    }
    
}
