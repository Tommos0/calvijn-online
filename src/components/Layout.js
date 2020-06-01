import React from "react";
import { Helmet } from "react-helmet";
import "./all.scss";
import useSiteMetadata from "./SiteMetadata";
import { graphql, StaticQuery, withPrefix } from "gatsby";
import { Articles } from "./Articles";

import logo from "../img/calvijn-logo.png";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <title>Calvijn Online</title>
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
        <meta name="viewport" content="width=1300" />
      </Helmet>
      {/*<Navbar />*/}
      {/*<div>{children}</div>*/}
      {/*<BlogRoll />*/}
      <div className="head">
        <div className="topheader">
          <img src={logo} />
          <header>{title}</header>
        </div>

        <div className="subhead">
          Amsterdam, NL - Het laatste nieuws - Maandag 1 juni 2020
        </div>
      </div>
      <div className="content">
        <div className="collumns">
          <Articles />
        </div>
      </div>
    </div>
  );
};
export default TemplateWrapper;
