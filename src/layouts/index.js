import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

import { dark, light } from "../styles/theme"
import "prismjs/themes/prism-tomorrow.css";
import "code-mirror-themes/themes/monokai.css";

import GlobalStyle from "../styles/global" ;
// import jpg from "../../static/posterframe.jpg";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 5rem;
  z-index: 9999;
  padding: 1rem;
  box-shadow: 0px 2px 8px ${props => props.theme.border};
  background-color: ${props => props.theme.cardBg};
`
const Brand = styled.div` 
  font-weight: 600;
  font-size: 1.25rem;
  margin-right: 1rem;
  a {
    text-decoration: none;
  }

`
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`
const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`
const Main = styled.div`
  margin: 5rem auto;
`
const ThemeButton = styled.button`
  font-size: 1.75rem;
  border: none;
  outline: none;
  background: transparent;
  text-align: center;
  cursor: pointer;
  padding: 1rem;
`


const TemplateWrapper = props => {

  const [ theme, setTheme ] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light" )
  }

  return (
    <StaticQuery
      render={data => {
        const frontmatter =
          props.data && props.data.markdownRemark
            ? props.data.markdownRemark.frontmatter
            : null;

        return (
          <ThemeProvider theme={theme === "light" ? light : dark }>
            <GlobalStyle />
            <Helmet
              title={
                frontmatter
                  ? `${frontmatter.title} – ${frontmatter.section} – ${data.site.siteMetadata.title}`
                  : data.site.siteMetadata.title
              }
              meta={[
                {
                  name: "og:title",
                  content: frontmatter
                    ? `${frontmatter.title} – ${frontmatter.section} – ${data.site.siteMetadata.title}`
                    : data.site.siteMetadata.title
                },
                {
                  name: "description",
                  content: frontmatter
                    ? frontmatter.description
                    : data.site.siteMetadata.description
                },
                {
                  name: "og:description",
                  content: frontmatter
                    ? frontmatter.description
                    : data.site.siteMetadata.description
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image"
                },
                // {
                //   name: "og:image",
                //   content: "https://btholt.github.io" + jpg
                // },
                // {
                //   name: "og:url",
                //   content:
                //     "https://btholt.github.io/complete-intro-to-containers" +
                //     (frontmatter && frontmatter.path ? frontmatter.path : "")
                // },
                {
                  name: "keywords",
                  content: data.site.siteMetadata.keywords.join(", ")
                },
                {}
              ]}
            />
            <Header>
              <HeaderContainer>
                <Brand>
                  <Link to="/">
                    {data.site.siteMetadata.title}
                  </Link>
                </Brand>
                {!frontmatter ? null : (
                  <div>{`${frontmatter.section} – ${frontmatter.title}`}</div>
                )}
                <ThemeButton 
                  onClick={toggleTheme}
                >
                  {theme === "light" ? "🌛" : "🌞" }
                </ThemeButton>
              </HeaderContainer>
            </Header>
            <Main>
              <Container>
                {props.children}
              </Container>
            </Main>
          </ThemeProvider>
        );
      }}
      query={graphql`
        query HomePage($path: String!) {
          markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
              path
              title
              order
              section
              description
            }
          }
          site {
            pathPrefix
            siteMetadata {
              title
              subtitle
              description
              keywords
            }
          }
        }
      `}
    />
  );
};

export default TemplateWrapper;
