import React from "react";
import { Button, Tab } from "semantic-ui-react";
import {ListPost} from '../../../components/Admin/Post'
import "./Blog.scss";


export const Blog = () => {

  const panes = [
    {
      menuItem: "Listado de Blog's",
      render: () => (
        <Tab.Pane attached={false}>
          <ListPost />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
    <div className="blog-page">
      <div className="blog-page__add">
        <Button primary> Nuevo Post</Button>
      </div>

      <Tab menu={{ secondary: true }} panes={panes} />

     </div>
    </>
  );
};
