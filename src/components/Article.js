import React from "react";
import { HTMLContent } from "./Content";

export default (props) => {
  console.log(props);
  return (
    <article>
      <art className="head">
        <span className="headline hl3">{props.data.frontmatter.title}</span>
        <p>
          <span className="headline hl4">
            door {props.data.frontmatter.author}
          </span>
        </p>
      </art>
      <HTMLContent content={props.data.html} />
    </article>
  );
};
