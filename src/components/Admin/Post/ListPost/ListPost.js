import React, {useState, useEffect} from "react";
import { Post } from '../../../../api'
import "./ListPost.scss";

const postController = new Post();

export const ListPost = () => {

  const [posts, setPosts] = useState(null)

  console.log(posts);

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
  

  return <div>ListPost</div>;
};
