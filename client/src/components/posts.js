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
    <div className="posts-wrapper">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="loading">Hang tight, fetching more awesomeness...</h4>}
        endMessage={
          <p className="posts-end">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="posts-container">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
