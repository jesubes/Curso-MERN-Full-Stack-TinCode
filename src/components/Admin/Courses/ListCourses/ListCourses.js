import React, { useState, useEffect } from "react";
import { Course } from "../../../../api";
import { size, map } from "lodash";
import { CourseItem } from "../CourseItem";
import { Loader, Pagination } from "semantic-ui-react";
import "./ListCourses.scss";

const coursesController = new Course();

export const ListCourses = (props) => {
  const { reload, onReload } = props;

  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await coursesController.getCourses({ page }); //se puede poner limit: 5
        setCourses(response.payload.docs);
        setPagination({
          limit: response.payload.limit,
          page: response.payload.page,
          pages: response.payload.totalPages,
          total: response.payload.totalDocs,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!courses) return <Loader active inline="centered" />;
  if (size(courses) === 0) return "No hay ningun curso";

  return (
    <div className="list-courses">
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} onReload={onReload}/>
      ))}

      <div className="list-courses__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};
