import React, { useState, useCallback, useEffect } from "react";
import Post from '../components/post'
import "../styles/components/post.scss";
import postsData from '../data/postsData.json'
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(() => {
    if (posts.length >= postsData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setPosts([...posts, ...postsData.slice(posts.length, posts.length + 5)]);
    }, 1000);
  }, [posts]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  return (
    <div className="posts-container">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
