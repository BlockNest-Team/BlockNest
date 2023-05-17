import React, { useState, useCallback, useEffect } from "react";
import Post from "../components/post";
import "../styles/components/post.scss";
import postsData from "../data/postsData.json"; //dummydata import
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // const fetchMoreData = useCallback(() => {
  //   if (posts.length >= postsData.length) {
  //     setHasMore(false);
  //     return;
  //   }

  //   setTimeout(() => {
  //     setPosts([...posts, ...postsData.slice(posts.length, posts.length + 5)]);
  //   }, 1000);
  // }, [posts]);

  // useEffect(() => {
  //   fetchMoreData();
  // }, [fetchMoreData]);

  // useEffect(async () => {
  //   const fetchPost = async () => {
  //     const res = await axios.get("/posts/timeline/6463ecf98fa74029f8811326");
  //     console.log(res);
  //   };
  //   fetchPost();

  //   // setPosts(response.data);
  // }, []);

  return (
    // infinite scroll start
    <div className="posts-wrapper">
      {/* <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <h4 className="loading">Hang tight, fetching more awesomeness...</h4>
        }
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
      </InfiniteScroll> */}
    </div>
  );
};

export default Posts;
