import React, { useState, useEffect } from "react";
import { Post } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import "./ListPosts.scss";

const postController = new Post();

export const ListPosts = () => {
  const [posts, setPosts] = useState(null);

  console.log(posts);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(2, 2);
        setPosts(response.postPayload.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  if(!posts) return <Loader active inline='centered' />

  return (
    <div className="list-posts-web">
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <span>{post.title}</span>
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination 
          totalPages={10}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
        />
      </div>
    </div>
  );
};
