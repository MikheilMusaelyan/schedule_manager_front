export const months: any[] = [
    ['Jan', 'Feb', 'Mar'], 
    ['Apr', 'May', 'Jun'], 
    ['Jul', 'Aug', 'Sept'], 
    ['Oct', 'Nov', 'Dec']
  ];

  export function flattenTree(node: any) {
    const flattened = [];
    
    function traverse(node: any) {
      flattened.push(node);
      if (node.children) {
        for (let child of node.children) {
          traverse(child);
        }
      }
    }
    
    traverse(node);
    
    return flattened;
  }