import React, {useState, useEffect} from 'react'
import './Post.scss'
import {useParams} from 'react-router-dom'
import {Post as PostController} from '../../../api'

const postController = new PostController();

export const Post = () => {
  const [post, setPost] = useState(null)
  const {path} = useParams()

console.log(post);
  useEffect(() => {
    (async () => {
      try{
        const response = await postController.getPost(path)

        setPost(response)

      } catch( error ){
        console.error(error)
      }
    })()
  }, [path])
  

  return (
    <div>
      
    </div>
  )
}
