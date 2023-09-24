import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListCourses } from "../../../components/Admin/Courses";
import "./Courses.scss";

export const Courses = () => {
  //modal para el nuevo curso
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Listado de Cursos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="courses-page">
        <div className="courses-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo Curso
          </Button>
        </div>

        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear Curso">
        <p>Formulario Para crear un curso</p>
      </BasicModal>
    </>
  );
};
