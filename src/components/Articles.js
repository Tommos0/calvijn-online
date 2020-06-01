import { graphql, StaticQuery, useStaticQuery } from "gatsby";
import React from "react";
import { HTMLContent } from "./Content";
import Article from "./Article";

export const Articles = () => {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "article" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            html
            fields {
              slug
            }
            frontmatter {
              title
              author
              templateKey
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `);

  const col1 = [
    "4c77f9cb-95f1-5bb2-b0d3-dacb748ca55d",

    "f7d39213-ec04-5b8e-9064-2901d894155b",
  ];

  const col2 = [
    "8b3e811f-c7ca-506a-bdcd-6f7147f919a7",

    "7e217aac-93c5-53ac-80b1-ad5af1789499",
  ];

  const col3 = [
    "10d9a152-9d14-589f-a1bf-670982382fe8",

    "1b2c40f0-c3db-5346-bf67-600fc577e71c",
  ];

  const nodes = data.allMarkdownRemark.edges.map((edge) => edge.node);

  console.log(
    "article IDs not in column: ",
    nodes
      .map((node) => node.id)
      .filter((id) => !col1.concat(col2).concat(col3).includes(id))
  );

  const col1items = nodes.filter((node) => col1.includes(node.id));
  const col2items = nodes.filter((node) => col2.includes(node.id));
  const col3items = nodes.filter((node) => col3.includes(node.id));

  return (
    <>
      <div className="collumn">
        {col1items.map((item) => (
          <Article key={item.id} data={item} />
        ))}
      </div>
      <div className="collumn">
        {col2items.map((item) => (
          <Article key={item.id} data={item} />
        ))}
      </div>
      <div className="collumn">
        {col3items.map((item) => (
          <Article key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};
