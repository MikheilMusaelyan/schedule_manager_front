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

  export function convertTime(time_string: string | number, bool: boolean) {
    if(bool){
      time_string = String(time_string)
      const hours = Number(time_string.split(":")[0])
      const minutes = Number(time_string.split(":")[1])
      let total_minutes = (hours * 4) + Math.floor(minutes / 15)
      return total_minutes  
    } 
    time_string = Number(time_string)
    const hours = Math.floor(time_string / 4);
    const minutes = (time_string % 4) * 15;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime
  }