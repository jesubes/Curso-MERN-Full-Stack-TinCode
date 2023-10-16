import React, { useState, useEffect } from "react";
import { Post } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import {ListPostItem} from '../ListPostItem'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { map } from "lodash";
import "./ListPosts.scss";

const postController = new Post();

export const ListPosts = () => {
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState()
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') || 1) //paginacion persistente

  console.log(searchParams.get('page'));

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(page, 9);
        setPosts(response.postPayload.docs);
        setPagination({
          limit: response.postPayload.limit,
          page: response.postPayload.page,
          pages: response.postPayload.totalPages,
        })
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);


  const changePage = (_, data) =>{
    const newPage = data.activePage;
    setPage(newPage)
    navigate(`?page=${newPage}`)
  }

  if(!posts) return <Loader active inline='centered' />

  return (
    <div className="list-posts-web">
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <ListPostItem post={post} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination 
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};
