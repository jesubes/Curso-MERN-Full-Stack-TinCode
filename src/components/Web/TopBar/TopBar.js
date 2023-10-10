import React, { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Icon } from "../../../assets";
import { Menu } from "../../../api";
import { socialData } from "../../../utils";
import "./TopBar.scss";

const menuController = new Menu();

export const TopBar = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await menuController.getMenu(true);
        setMenu(response.payload);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            <Icon.LogoWhite />
          </Link>
        </div>

        <div className="menu">
          {map(menu, (item) => (
            <a key={item._id} href={item.path}>
              {item.title}
            </a>
          ))}
        </div>

        <div>
          {map(socialData, (social) => (
            <Button 
              key={social.type}
              as="a"
              target="_blank"
              href={social.link}
              color={social.type}
              icon={social.type}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
