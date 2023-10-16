import React, {useState, useEffect} from 'react'
import {Post} from '../../../../api'
import './ListPosts.scss'

const postController = new Post()

export const ListPosts = () => {
  const [posts, setPosts] = useState(null)

  console.log(posts);

  useEffect(() => {
    (async () =>{
      try{
        const response = await postController.getPosts(2,2);
        setPosts(response.postPayload.docs);
      } catch( error ){
        console.error( error)
      }
    })()
  }, [])
  

  return (
    <div>ListPosts</div>
  )
}
