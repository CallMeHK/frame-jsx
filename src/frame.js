export default class h {
  static dom(type, props, children) {
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

  static renderToDom(vnode, root) {
    let elt = document.createElement(vnode.type);
    if (vnode.props !== null) {
      Object.keys(vnode.props).forEach(prop => {
        prop === "className"
          ? elt.setAttribute("class", vnode.props[prop])
          : elt.setAttribute(prop, vnode.props[prop]);
      });
    }
    if (typeof vnode.children === "string") {
      elt.innerText = vnode.children;
    } else if (typeof vnode.children === "undefined") {
    } else {
      vnode.children.forEach(child => {
        h.renderToDom(child, elt);
      });
    }
    root.appendChild(elt);
  }

  static createElement(node) {
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
      console.log("str", node.children);
      $el.innerText = node.children;
    } else if (typeof node.children !== "undefined") {
      console.log("arr", node.children);
      node.children
        .map(elt => {
          console.log(elt);
          return h.createElement(elt);
        })
        .forEach(elt => $el.appendChild(elt));
    }
    return $el;
  }

  static diff($parent, oldNode, newNode, index = 0) {
    if (!oldNode) {
      $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
      $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
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
