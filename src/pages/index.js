import React from "react";
import styled from "styled-components" ;
import { StaticQuery, graphql } from "gatsby";
import Card from "../components/TOCCard";

const Jumbotron = styled.div`
  padding: 3rem 0;
  text-align: center;
`
const Heading = styled.h1`
  font-size: 3.5rem;
  margin: 2rem 0 ;
`
const Subheading = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 ;
`
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query HomepageTOC {
        site {
          siteMetadata {
            title
            subtitle
            description
            keywords
          }
        }
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___order] }) {
          edges {
            node {
              id
              frontmatter {
                order
                path
                title
                section
                description
              }
            }
          }
        }
      }
    `}
    render={props => (
      <div>

        <Jumbotron>
          <Heading>{props.site.siteMetadata.title}</Heading>
          <Subheading>{props.site.siteMetadata.subtitle}</Subheading>
        </Jumbotron>

        <Card
          title="Table of Contents"
          content={props.allMarkdownRemark.edges}
        />

      </div>
    )}
  />
);

export default IndexPage;
