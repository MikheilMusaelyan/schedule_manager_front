import { Component } from '@angular/core';
import * as nodes from './nodes'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    let node = {
      start: 13.5,
      end: 14.6,
      children:[]
    }
    console.log(node,nodes.children.slice())
    nodes.newNode(nodes.children, node)
    console.log(nodes.children)
  }
}

