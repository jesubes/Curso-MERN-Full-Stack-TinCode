import React from "react";
import {Link} from 'react-router-dom'
import {Button, Icon, Confirm} from 'semantic-ui-react'
import "./PostItem.scss";

export const PostItem = (props) => {
  const { post } = props

  return (
    <>
     <div className="post-item">
      <div className="post-item__info">
        <span className="post-item__info-title">{post.title}</span>
        <span className="post-item__info-path">{post.path}</span>
      </div>

      <div>
        <Button as={Link} icon to={`/blog/${post.path}`} target='_blank'>
          <Icon name="eye" />
        </Button>
        <Button icon primary >
          <Icon name="pencil" />
        </Button>
        <Button icon color='red'>
          <Icon name="trash"/> 
        </Button>
      </div>
     </div>
    </>
  )
};
