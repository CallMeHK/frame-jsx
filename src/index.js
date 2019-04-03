/** @jsx h.dom */
import h from "./frame";

let $root = document.getElementById("app");

const Beer = props => {
  const imgUrl =
    "https://images.unsplash.com/photo-1553689895-6e1cd3957b63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80";

  return (
    <div>
      <h2 className="hi">Hello</h2>
      <img height="150" src={imgUrl} />
      <br/>
      <button id="add">Add</button>
      <button id="sub">Subtract</button>
      <br/>
      <button id="replace">Replace</button>
      
      <ul>
        {props.list.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

let soup = ["beer", "cheese", "soup"];
// const node = h.createElement(<Beer list={soup} />)
// $root.appendChild(node);
h.diff($root, null, <Beer list={soup} />);
document.addEventListener("click", e => {
  if (e.target.id === "add") {
    h.diff($root, <Beer list={soup} />, <Beer list={[...soup, "BEER"]} />);
    soup = [...soup, "BEER"];
  } else if (e.target.id === "sub") {
    h.diff(
      $root,
      <Beer list={soup} />,
      <Beer list={soup.filter((elt, i) => i !== soup.length - 1)} />
    );
    soup = soup.filter((elt, i) => i !== soup.length - 1);
  } else if (e.target.id === "replace") {
    h.diff(
      $root,
      <Beer list={soup} />,
      <Beer list={["MEGA BEER","Mega cheess","zoup"]} />
    );
    soup = ["MEGA BEER","Mega cheess","zoup"]
  }
});
