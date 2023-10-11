import React from "react";
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils";
import "./Info.scss";

export const Info = () => {
  return (
    <div className="footer-info">
      <Icon.LogoWhite className="log" />
      <p>
        Entra en el mundo del desarrolo web.
        Disfruta de la creacion de nuevos proyecto. Tu imaginacion va a fluir en tus lineas de código.
      </p>


      {map(socialData, (social) =>(
        <Button 
          key={social.type}
          as="a"
          target = "_blank"
          href  = {social.link}
          color = { social.type}
          icon = {social.type}
        >

        </Button>
      ))}
    </div>
  );
};
