import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { HTMLContent } from "./Content";
import Article from "./Article";

export const Articles = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data, count) => (
      <>
        {data.allMarkdownRemark.edges.map((edge) => (
          <Article key={edge.node.id} data={edge.node} />
        ))}
      </>
    )}
  />
);
