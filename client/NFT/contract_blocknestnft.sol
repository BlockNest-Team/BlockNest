// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SocialMediaNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Data structure to hold post data
    struct Post {
        uint256 id;
        address owner;
        string content;
        string imageURI;
    }

    // Array to hold all posts
    Post[] public posts;

    constructor() ERC721("SocialMediaNFT", "SMNFT") {}

    // Function to create a new post and mint an NFT for the post
    function createPost(string memory content, string memory imageURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newPostId = _tokenIds.current();
        _mint(msg.sender, newPostId);
        _setTokenURI(newPostId, imageURI);

        // Create a new post and store it
        Post memory newPost;
        newPost.id = newPostId;
        newPost.owner = msg.sender;
        newPost.content = content;
        newPost.imageURI = imageURI;

        posts.push(newPost);

        return newPostId;
    }

    // Function to get total posts
    function getTotalPosts() public view returns (uint256) {
        return posts.length;
    }

    // Function to get post by Id
    function getPostById(uint256 postId) public view returns (Post memory) {
        return posts[postId - 1];
    }
}
