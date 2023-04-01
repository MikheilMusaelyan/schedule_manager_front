export const children: any[] = [
    {
      start: 13,
      end: 17,
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
    }
  ]

export function newNode(children: any[], node: any) {
    for(let i = 0; i < children.length; i ++){

        if(node.start <= children[i].start && node.end >= children[i].end){
            node.children.push(children[i])
            return
        }

        else if(node.start > children[i].start && node.start < children[i].end) {
            if(children[i].children.length == 0) {
                children[i].children.push(node)
                break
            }
            newNode(children[i].children, node)
            break
        } 
        
        else if(node.start <= children[i].start && node.end > children[i].start) {
            if(children[i].children.length > 0) {
                addToQueue(node, children[i].children)
            }

            // node.children.push(children[i])
            console.log(children)
            children.splice(i, 1, node)
            break
        }
        
        else if(node.start < children[i].start && node.end < children[i].start) {
            children.splice(i, 0, node)
            break 
        } // ????
    }
}


function addToQueue(node: any, checkChildren: any[], queue: any[] = []) {
    for (let i = 0; i < checkChildren.length; i++) {
        if(node.end > checkChildren[i].start) {
            if(node.end > checkChildren[i].end || checkChildren[i].children.length == 0) {
                return
            }
            addToQueue(node, checkChildren[i].children)
        }
        else {
            let toPush = checkChildren.splice(i)
            putInQueue(toPush)
            break
        }
    }
}

function putInQueue(toPush: any, queue: any[] = []) {
    console.log(toPush, 'these have to perform addNode')

    for (let child of toPush) {
      if(child.children.length > 0){
        let singleChild = child.children.slice(0)
        queue.push(singleChild);
      }         
    }
    
}