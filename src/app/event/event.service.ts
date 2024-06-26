import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventBackend } from "./event-model";

@Injectable({providedIn: 'root'})
export class EventService{
    constructor(
      private http: HttpClient
    ) {
    }

    addEvent(myEvent: any) {
      let event = this.getTransofrmedEvent(myEvent.event)
      return this.http.post('https://drf.up.railway.app/api/event/', event)
    }
    
    putEvent(myEvent: any){
      let event = this.getTransofrmedEvent(myEvent.event)
      return this.http.put(`https://drf.up.railway.app/api/event/${myEvent.event.serverId}/`, event)
    }

    getTransofrmedEvent(myEvent: any): EventBackend {
      // const currentDay = new Date(myEvent.date).getDate()
      // const newDate = new Date(myEvent.date)
      // newDate.setDate(currentDay - 1)
      return {
        start: myEvent.start,
        end: myEvent.end,
        date: new Date(myEvent.date).toISOString().split('T')[0],
        name: myEvent.name,
        color: myEvent.color,
      }
    }

    deleteEvent(id: number){
      return this.http.delete(`https://drf.up.railway.app/api/event/${id}/`) 
    }

    getEvents(data: any){
      const date: Date = data
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      return this.http.get(`https://drf.up.railway.app/api/event/${day}/${month}/${year}/`)
    }


//     newNode(children: Node[], node: Node): any {
      
//         if(!node?.id){
//           node.id = ++this.nodesCount
//         }

//         let queue: Node[] = []
//         let spliced = false
//         if(children.length == 0) {
//           children.push(node)
//           return
//         }
        
//         for(let i = 0; i < children.length; i++){  
//             if(node.start <= children[i].start && node.end >= children[i].end){
//               node.children.push(children[i])
//               if(spliced == false){ 
//                 children.splice(i, 1, node);
//                 spliced = true 
//               } else {
//                 children.splice(i, 1)
//                 // console.log(children.slice())
//                 i--
//               }
//             }
//             //tols orivegan vamocmebt, iq ubralod vamocmebt tu grdzelia node (da childs vnestav)
//             // da tu arari, anu moklea da chainesteba child shi
//             else if(node.start >= children[i].start && node.start < children[i].end) {
//               // console.log('node is in child')
//               if(children[i].children.length == 0) {
//                   children[i].children.push(node)
//                   break
//               }
//               this.newNode(children[i].children, node)
//               break
//             } 

//             else if(node.start >= children[i].end && i == (children.length - 1)){
//               // console.log('node is the biggest in the children and cant compare to next one')
//               children.push(node)
//               break
//             }

//             else if(node.start <= children[i].start && node.end > children[i].start) {
//                 node.children.push(children[i])
//                 if(spliced == false){
//                   children.splice(i, 1, node)
//                   spliced = true // could even not write because this happens to the last node
//                                  // is overlapped
//                 } else {
//                   children.splice(i, 1)
//                   i-- // gind kofila gind ara
//                 }

//                 if(node.children[node.children.length - 1].children.length > 0) {
//                     this.addToQueue(node.end, node.children[node.children.length - 1], queue)
//                     queue.forEach(element => {
//                       //????? children or childs
//                        this.newNode(children, element);
//                       //?????
//                     });
//                     // queue = [] 
//                     break
//                 }
//                 break
//             }

//             else if(node.start < children[i].start && node.end <= children[i].start) {
//                 // console.log('node doesnt overlap with anything')
//                 if(spliced == false){
//                   children.splice(i, 0, node)
//                 }
//                 break 
//             }

//         }
//     }


// addToQueue(node: number, child: Node, queue: Node[]) {
//     let checkChildren: any[] = child.children
//     // console.log('added to queue: ', checkChildren.slice())

//     for (let i = 0; i < checkChildren.length; i++) {
//       if(node > checkChildren[i].start) {
//         if(node >= checkChildren[i].end || checkChildren[i].children.length == 0){
//           continue
//         }
//         this.addToQueue(node, checkChildren[i], queue)
//       }
//       else {
//         let toPush = checkChildren.splice(i)
//         this.putInQueue(toPush, queue)
//         break
//       }
//     }
// }

// removeChildren(node: number, child: Node, queue: Node[]) {
//   let checkChildren: any[] = child.children

//   for (let i = 0; i < checkChildren.length; i++) {
//     if(node <= checkChildren[i].start) {
//       const childrenCopy = checkChildren.splice(i)
//       this.putInQueue(childrenCopy, queue)
//       return
//     }
//     this.removeChildren(node, checkChildren[i], queue)
//   }
// }

// putInQueue(toPush: Node[], queue: Node[]) {
//     for (let child of toPush) {
//       let childChildren = child.children.splice(0)      
//       queue.push(child);
//       if(childChildren.length > 0){
//         this.putInQueue(childChildren, queue) 
//       }
//     }
// }

// deleteEvent(thisEvent: Node, parent: Node[], index: number) {
//   if(!thisEvent.id){
//     return
//   }
//   let nodeQueue: Node[] = []
//   if(thisEvent.children.length > 0){ 
//     let childrenCopy = thisEvent.children.slice()
//     if(parent[index+1]){   
//       parent.splice(index, 1)
//       this.putInQueue(childrenCopy, nodeQueue)
//       nodeQueue.forEach((e: Node) => {
//         this.newNode(parent, e)
//       })
//       return   
//     }
//     parent.splice(index, 1, ...childrenCopy)
//     return
//   }
//   parent.splice(index, 1)
// }

// moveEvent(thisEvent: Node, parent: Node[], index: number) {
//   this.deleteEvent(thisEvent, parent, index)
//   thisEvent.children.splice(0)
//   this.newNode(this.childs, thisEvent)
// }

// resizeEvent(e: any, thisEvent: Node, parent: Node[], index: number) {
//   let queue = []
//   if(!e) {
//     for(let i = 0; i < thisEvent.children.length; i++) {
//       if(thisEvent.end <= thisEvent.children[i].start) {
//         const childrenCopy = thisEvent.children.splice(i)
//         if(parent[index+1]){
//           this.putInQueue(childrenCopy, queue)
//           queue.forEach((e: Node) => {
//             this.newNode(parent, e)
//           })
//           return
//         }
//         parent.push(...childrenCopy)
//         return
//       } else if(thisEvent.end < thisEvent.children[i].end){
//         this.removeChildren(thisEvent.end, thisEvent.children[i], queue)
//         queue.forEach((e: Node) => {
//           this.newNode(parent, e)
//         })
//       }
//     }
//     return
//   };

//   for(let i = index + 1; i < parent.length; i++){
//     if(thisEvent.end > parent[i].start) {
//       const newChildren = parent.splice(i, 1)
//       this.putInQueue(newChildren, queue);
//       queue.forEach((e: Node) => {
//         this.newNode(parent, e)
//       })
//       queue = []
//       i--
//     } else {
//       return
//     }
//   } 
// }

}