import React, { useState, useEffect } from "react";
import { Course } from "../../../api";
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
import { image } from "../../../assets";
import { Courses as CoursesComponet } from "../../../components/Web";
import "./Courses.scss";

const courseController = new Course();

export const Courses = () => {
  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const isCurrentLastPage = pagination?.page === pagination?.pages;

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 9 });

        setPagination({
          page: response.payload.page,
          pages: response.payload.totalPages,
        });

        if (!courses) setCourses(response.payload.docs);
        else setCourses([...courses, ...response.payload.docs]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container className="courses-page">
      <Image src={image.academyLogo} />
      <h2>
        En la web vas a encontrar los mejores cursos online de programación en
        Español. Unete a nosotros y empieza tu camino como programador frontend
        o backend!
      </h2>

      <div className="courses">
        {map(courses, (course) => (
          <div key={course._id} className="courses__item">
            <CoursesComponet course={course} />
          </div>
        ))}
      </div>

      {!isCurrentLastPage && (
        <div className="more">
          <Button primary onClick={loadMore}>
            Cargar mas...
          </Button>
        </div>
      )}
    </Container>
  );
};
