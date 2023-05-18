import React, { useState, useCallback, useEffect, useContext } from "react";
import Post from "../components/post";
import "../styles/components/post.scss";
import postsData from "../data/postsData.json"; //dummydata import
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

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
  // const fetchPost = async () => {
  //   const res = await axios.get("/posts/timeline/6463ecf98fa74029f8811326");
  //   // console.log(res);
  //   setPosts(res.data);
  //   // console.log(res.data);
  // };

  // useEffect(() => {
  //   fetchPost();

  //   // setPosts(response.data);
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = user.firstName
        ? await axios.get("/posts/profile/" + user.firstName)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
          console.log(res.data);
        })
      );
    };
    fetchPosts();
  }, [user.firstName, user._id]);

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
      > */}
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </div>
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default Posts;
