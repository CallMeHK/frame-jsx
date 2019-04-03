export default class h {
  static dom(type, props, children) {
    if (typeof type !== "string") {
      return type(props);
    }
    if (arguments.length > 3) {
      children = [children];
      for (let i = 3; i < arguments.length; i++) {
        children.push(arguments[i]);
      }
    }

    return {
      type,
      props,
      children
    };
  }

  static createElement(node) {
    console.log(node);
    if (typeof node === "string") {
      return document.createTextNode(node);
    }

    const $el = document.createElement(node.type);
    if (node.props !== null) {
      Object.keys(node.props).forEach(prop => {
        prop === "className"
          ? $el.setAttribute("class", node.props[prop])
          : $el.setAttribute(prop, node.props[prop]);
      });
    }
    if (typeof node.children === "string") {
      // console.log("str", node.children);
      $el.innerText = node.children;
    } else if (typeof node.children !== "undefined") {
      // console.log("arr", node.children);
      node.children
        .map(elt => {
          // console.log(elt);
          return h.createElement(elt);
        })
        .forEach(elt => $el.appendChild(elt));
    }
    return $el;
  }

  static changed(node1, node2) {
    const nodeTypeCheck = node1.type !== node2.type;
    let childTypeCheck = false
    if (typeof node1.children !=="object" && node1.children !== node2.children){
      childTypeCheck = true
    }
    return nodeTypeCheck || childTypeCheck;
  }


  //  NEED TO QUENE CHANGES, MANY ISSUES OTHERWISE
  static diff($parent, oldNode, newNode, index = 0) {

    console.log("old",oldNode,"new", newNode);
    // if there is no old node
    if (!oldNode) {
      $parent.appendChild(h.createElement(newNode));
    } 
    // if there is no new node
    else if (!newNode) {
      // debugger;
      $parent.removeChild($parent.childNodes[index]);
    }
    // if new and old do not have the same type OR they are not an array AND are not equivalent
    else if (h.changed(oldNode, newNode)){
      $parent.replaceChild(h.createElement(newNode), $parent.childNodes[index]);
    }
    // if there is a node with a type
    else if (newNode.type && typeof newNode.children === "object") {
      // get the length of both the old node and new node children array
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      // walk through each node
      for (let i = 0; i < newLength || i < oldLength; i++) {
        h.diff(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
  }
}
