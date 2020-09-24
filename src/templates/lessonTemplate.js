import React from "react";
import styled from "styled-components" ;
import Link from "gatsby-link";
import { graphql } from "gatsby";
import * as helpers from "../util/helpers";

const sortFn = helpers.sorter;

const LessonCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  box-shadow: 0px 2px 8px ${props => props.theme.border};
  border-radius: 10px;
  margin-top: 8rem;
`
const Lesson = styled.div`
`
const LessonTitle = styled.h1`
  padding: 2rem;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.border};
`
const LessonContent = styled.div`
  padding: 2rem;
  img {
    max-width: 100%;
    border-radius: 10px;
    margin: 1rem auto;
  }
  blockquote {
    background-color: ${props => props.theme.bg};
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1rem 0;
    p {
      padding: 1rem;
      margin: 0;
      border-left: 6px solid ${props => props.theme.highlight};
    }
  }
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border: 2px solid ${props => props.theme.bg};
    thead {
      text-align: left;
      background-color: ${props => props.theme.bg};
    }
    th, td {
      padding: 0.5rem;
    }
    td {
      border: 2px solid ${props => props.theme.bg};
    }
  }
  code[class*="language-"],
  pre[class*="language-"] {
    border-radius: 10px;
    text-align: left;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
`
const LessonLinks = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.border};
`

export default function Template(props) {
  let { markdownRemark, allMarkdownRemark } = props.data; // data.markdownRemark holds our post data

  const sections = allMarkdownRemark.edges
    .map(lesson => lesson.node.frontmatter)
    .sort(sortFn);

  const { frontmatter, html } = markdownRemark;

  const index = sections.findIndex(el => el.path === frontmatter.path);

  const prevLink =
    index > 0 ? (
      <Link className="prev" to={sections[index - 1].path}>
        {"← " + sections[index - 1].title}
      </Link>
    ) : null;
  const nextLink =
    index < sections.length - 1 ? (
      <Link className="next" to={sections[index + 1].path}>
        {sections[index + 1].title + " →"}
      </Link>
    ) : null;
  return (
    <LessonCard>
      <Lesson>
        <LessonTitle>{frontmatter.title}</LessonTitle>
        <LessonContent
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <LessonLinks>
          {prevLink}
          {nextLink}
        </LessonLinks>
      </Lesson>
    </LessonCard>
  );
}

export const pageQuery = graphql`
  query LessonByPath($path: String!) {
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
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          frontmatter {
            order
            path
            title
          }
        }
      }
    }
  }
`;
