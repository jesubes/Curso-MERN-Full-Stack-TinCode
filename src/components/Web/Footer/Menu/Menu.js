import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export const Menu = () => {
  return (
    <div className="footer-menu">
      <h4>Navegación</h4>

      <Grid columns={2}>
        <Grid.Column>
          <Link to="/cursos">
            <Icon name="book" /> Curso online
          </Link>

          <Link to="#">
            <Icon name="code" /> Dessarrollo web
          </Link>

          <Link to="#">
            <Icon name="database" /> Base de datos
          </Link>

          <Link to="#">
            <Icon name="code" /> UI/UX
          </Link>
        </Grid.Column>
        <Grid.Column>
          <Link to="#">
            <Icon name="server" /> Sistemas / Servidores
          </Link>

          <Link to="#">
            <Icon name="code" /> CMS
          </Link>

          <Link to="#">
            <Icon name="user outline" /> Porfolio
          </Link>

          <Link to="#">
            <Icon name="python" /> Backend
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
};
