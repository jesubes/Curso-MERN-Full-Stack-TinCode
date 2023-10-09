import React from "react";
import { Container } from "semantic-ui-react";
import "./ClientLayout.scss";

export const ClientLayout = (props) => {
  const { children } = props;

  return (
    <div className="client-layout">
      <div className="client-layout__header">
        <p>HEADER</p>
      </div>

      {children}

      <div className="client-layout__footer">
        <Container>
          <span>INFO</span>
          <span>MENU</span>
          <span>NEWSLETTER</span>
        </Container>
        <Container>
          <span>ALL RIGHTS RESERVED</span>
          <span>JESUS BENJAMIN ESCACENA | SR FULLSTACK DEVELOPER</span>
        </Container>
      </div>
    </div>
  );
};
