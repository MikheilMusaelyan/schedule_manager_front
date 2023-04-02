export let childs: Node[] = [
    {
      start: 13,
      end: 37,
      children: [
        {
          start: 14,
          end: 15,
          children: [
            {
              start: 14.5,
              end: 18,
              children: []
            }
          ]
        },
        {
          start: 16,
          end: 20,
          children: [
            {
              start: 16.5,
              end: 22,
              children: []
            }
          ]
        }
      ]
    },
    
  ]

 export interface Node {
    start: number;
    end: number;
    children: Node[];
  }

export function newNode(children: Node[], node: Node) {
    for(let i = 0; i < children.length; i ++){
      console.log(i)
        if(node.start <= children[i].start && node.end >= children[i].end){
            console.log('node is the biggest')
            node.children.push(children[i])
            children.splice(i, 1, node)
            return
        }

        else if(node.start > children[i].start && node.start < children[i].end) {
          console.log('node is in child')
            if(children[i].children.length == 0) {
                children[i].children.push(node)
                break
            }
            newNode(children[i].children, node)
            break
        } 

        else if(node.start >= children[i].end && i == (children.length - 1)){
          console.log('node is the biggest in the children and cant compare to next one')
          children.push(node)
          break
        }

        else if(node.start <= children[i].start && node.end > children[i].start) {
          console.log('node overlaps a child partially')
            node.children.push(children[i])
            children.splice(i, 1, node)
            if(node.children[node.children.length - 1].children.length > 0) {
                addToQueue(node.end, node.children[node.children.length - 1])
                queue.forEach(element => {
                  newNode(childs, element)
                })
                break
            }
            break
        }
        
        else if(node.start < children[i].start && node.end < children[i].start) {
            console.log('node doesnt overlap with anything')
            children.splice(i, 0, node)
            break 
        } // ????

        

    }
}


export function addToQueue(node: number, child: Node) {
    let checkChildren: any[] = child.children

    for (let i = 0; i < checkChildren.length; i++) {
      
      if(node > checkChildren[i].start) {
        if(node >= checkChildren[i].end || checkChildren[i].children.length == 0) {
            return
        }
        addToQueue(node, checkChildren[i])
      }
      else {
        let toPush = checkChildren.splice(i)
        putInQueue(toPush)
        break
      }
    }
}

const queue: Node[] = []

export function putInQueue(toPush: Node[]) {
    for (let child of toPush) {
      let childChildren = child.children.splice(0)
      queue.push(child);
      if(childChildren.length > 0){
        putInQueue(childChildren) 
      }  
    }
    
}
