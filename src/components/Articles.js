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
    "/article/anderhalve-meter/",
    "/article/2020-06-01-de-titel-2/",
  ];

  const col2 = [
    "/article/lilly-hamsterde-aan-het-begin-van-de-coronacrisis-zoveel-mogelijk-vitamine-c-bij-elkaar/",
    "/article/2020-06-01-de-titel-2-1/",
  ];

  const col3 = [
    "/article/2020-06-01-de-titel-3/",
    "/article/2020-06-01-de-titel/",
  ];

  const nodes = data.allMarkdownRemark.edges.map((edge) => edge.node);

  const noColumnItems = nodes.filter(
    (node) => !col1.concat(col2).concat(col3).includes(node.fields.slug)
  );

  console.log(
    "article IDs not in column: ",
    noColumnItems.map((node) => node.fields.slug)
  );

  const col1items = nodes.filter((node) => col1.includes(node.fields.slug));
  const col2items = nodes.filter((node) => col2.includes(node.fields.slug));
  const col3items = nodes
    .filter((node) => col3.includes(node.fields.slug))
    .concat(noColumnItems);

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
