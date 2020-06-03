import { graphql, StaticQuery, useStaticQuery } from "gatsby";
import React from "react";
import Article from "./Article";

export const Articles = () => {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      allMarkdownRemark(
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
    "/article/ece-uit-3d-stuurde-deze-prachtige-foto-in/", // emiel
    "/article/anderhalve-meter/",
    "/article/meester-emiel-neemt-op-originele-wijze-het-huiswerk-voor-de-eerste-klassen-nog-even-door/", //ece
    "/article/2020-06-01-de-titel-2/", //kunst
  ];

  const col2 = [
    "/article/2020-06-01-de-titel-3/", // Ahlam jarig
    "/article/de-mop-van-dina/",
    "/article/bahar-maakte-dit-leuke-filmpje-over-haar-tijd-in-quarantaine/",
    "/article/2020-06-01-de-titel-2-1/", // hicham
    "/article/typisch-corona/",
  ];

  const col3 = [
    "/article/lilly-hamsterde-aan-het-begin-van-de-coronacrisis-zoveel-mogelijk-vitamine-c-bij-elkaar/",
    "/article/alan-walker-faded/",
    "/article/öygü-uit-3b-wil-koreaans-chinees-en-thais-leren/",
    "/article/2020-06-01-de-titel/", // eten
  ];

  const nodes = data.allMarkdownRemark.edges.map((edge) => edge.node);

  const noColumnItems = nodes.filter(
    (node) => !col1.concat(col2).concat(col3).includes(node.fields.slug)
  );

  console.log(
    "article IDs not in column: ",
    noColumnItems.map((node) => node.fields.slug)
  );

  const col1items = col1.map((link) =>
    nodes.find((node) => node.fields.slug === link)
  );
  const col2items = col2.map((link) =>
    nodes.find((node) => node.fields.slug === link)
  );
  const col3items = col3
    .map((link) => nodes.find((node) => node.fields.slug === link))
    .concat(noColumnItems);

  console.log(col1items.map((item) => item.fields.slug));

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
