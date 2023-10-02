import React, {useState, useEffect} from "react";
import { Post } from '../../../../api'
import {Loader} from 'semantic-ui-react'
import {map, size} from 'lodash'
import {PostItem} from '../PostItem'
import "./ListPost.scss";

const postController = new Post();

export const ListPost = () => {

  const [posts, setPosts] = useState(null)

  useEffect(() => {
    ( async () => {
      try{
        const response = await postController.getPosts();
        setPosts(response.postPayload.docs);

      } catch( error ){
        console.error(error)
      }
    }
    )()
  }, [])
  
  if(!posts) return <Loader active inline="centered"/>
  if(size(posts) === 0 ) return 'No hay ningun post'

  return (
    <div className="list-post">
      {map(posts, (post) =>(
        <PostItem key={post._id} post={post}/> 
      ))}

      <div>{/*paginación */}</div>
    </div>
  )
};
