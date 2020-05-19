import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  ListGroup
} from "react-bootstrap";

function ChapterPage() {
  const [chapters, setChapters] = React.useState([]);
  const [chapterSections, setChapterSections] = React.useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const result = await axios(
        'http://localhost:5000/chapters'
      );

      setChapters(result.data);
    };

    fetchChapters();

    const fetchChapterSections = async () => {
      const result = await axios(
        'http://localhost:5000/sections'
      );

      setChapterSections(result.data);
    };

    fetchChapterSections();
  }, []);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Chapters</Breadcrumb.Item>
      </Breadcrumb>
      <Accordion>
        {chapters.map(chapter => {
          return (
            <Card key={chapter.chaptertext}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={chapter.chapterid}>
                  {chapter.chaptertext}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={chapter.chapterid}>
                <Card>
                  <ListGroup variant="flush">
                    {chapterSections.map(chapterSection => {
                      let section;
                      if (chapterSection.chapterid == chapter.chapterid) {
                        section =
                          <ListGroup.Item key={chapterSection.sectiontext}>
                            <Link to={{
                              pathname: "/tips",
                              state: {
                                sectionid: chapterSection.sectionid
                              }
                            }}>
                              {chapterSection.sectiontext}
                            </Link>
                          </ListGroup.Item>;
                      }
                      return section;
                    })}
                  </ListGroup>
                </Card>
              </Accordion.Collapse>
            </Card>
          )
        })}
      </Accordion>
    </div>
  );
}

export default ChapterPage;
