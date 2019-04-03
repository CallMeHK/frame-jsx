/** @jsx h.dom */
import h from "./frame";

let root = document.getElementById("app");

const beer = props => {
  const imgUrl =
    "https://images.unsplash.com/photo-1553689895-6e1cd3957b63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80";

  return (
    <div>
      <h2 className="hi">Hello</h2>
      <img height="150" src={imgUrl} />
      <ul>
        {props.list.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <button onClick="console.log('hi')">Click me</button>
    </div>
  );
};

//console.log(beer());

// h.renderToDom(beer(), root);
const soup = ["beer", "cheese", "soup"];
const node = <beer list={soup} />;
const vnode = beer({ list: soup });
console.log(node);
root.appendChild(h.createElement(vnode));
