import React from "react";
import styled from "styled-components" ;
import Link from "gatsby-link";
import * as helpers from "../util/helpers";

const MainCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  box-shadow: 0px 2px 8px ${props => props.theme.border};
  border-radius: 10px;
`
const Title = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${props => props.theme.border};
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #666;
    margin: 0;
  }
`
const Content = styled.div`
  padding: 1rem 2rem;
`
const SectionList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 2rem 0;
    }
    margin: 1rem 0;
  }
`
const LessonList = styled.ol`
  li {
    font-size: 1.25rem;
    font-weight: 700;
    a {
    }
    margin: 1rem 0;
  }
`
const sortFn = helpers.sorter;

const LessonCard = ({ content, title }) => {
  console.log(sortFn);

  const sections = content
    .map(lesson => lesson.node.frontmatter)
    .sort(sortFn)
    .reduce((acc, lesson) => {
      if (!acc.length) {
        acc.push([lesson]);
        return acc;
      }

      const lastSection = acc[acc.length - 1][0].section.split(",")[0];
      if (lastSection === lesson.section.split(",")[0]) {
        acc[acc.length - 1].push(lesson);
      } else {
        acc.push([lesson]);
      }

      return acc;
    }, []);

  return (
    <MainCard>
      <Title><h2>{title}</h2></Title>
      <Content>
        <SectionList>
          {sections.map(section => (
            <li key={section[0].section}>
              <h3 className="lesson-section-title">{section[0].section}</h3>
              <LessonList>
                {section.map(lesson => (
                  <li key={lesson.path}>
                    <Link to={lesson.path}>{lesson.title}</Link>
                  </li>
                ))}
              </LessonList>
            </li>
          ))}
        </SectionList>
      </Content>
    </MainCard>
  );
};

export default LessonCard;
