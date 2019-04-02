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
}
