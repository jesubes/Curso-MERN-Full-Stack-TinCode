import React, {useState, useEffect} from "react";
import { Post } from '../../../../api'
import {Loader, Pagination} from 'semantic-ui-react'
import {map, size} from 'lodash'
import {PostItem} from '../PostItem'
import "./ListPost.scss";

const postController = new Post();

export const ListPost = () => {

  const [posts, setPosts] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)


  useEffect(() => {
    ( async () => {
      try{
        const response = await postController.getPosts(page, 2);
        setPosts(response.postPayload.docs);
        setPagination({
          limit: response.postPayload.limit,
          page: response.postPayload.page,
          pages: response.postPayload.totalPages,
          total: response.postPayload.totalDocs,
        })
      } catch( error ){
        console.error(error)
      }
    }
    )()
  }, [page])
  
  const changePage = (_, data) => {
    setPage(data.activePage)
  }

  if(!posts) return <Loader active inline="centered"/>
  if(size(posts) === 0 ) return 'No hay ningun post'

  return (
    <div className="list-post">
      {map(posts, (post) =>(
        <PostItem key={post._id} post={post}/> 
      ))}

      <div className="list-post__pagination">
        <Pagination 
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  )
};
