import { useEffect, useState, useRef } from "react";
import data from "../data/searchData.json";
import "../styles/components/searchbar.scss";
import searchIcon from "../assets/svgs/search.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        inputVisible
      ) {
        setInputVisible(false);
        setResults([]);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [inputVisible]);

  useEffect(() => {}, [searchTerm]);

  const fetchPosts = async () => {
    const res = await axios.get("users/" + searchTerm);
    console.log(res.data.firstName);
    console.log(res.data.lastName);
    console.log(res.data.profilePicture);
    // console.log(res.data);

    setUserProfile(res.data);

    setResults([
      {
        name: `${res.data.firstName} ${res.data.lastName}`,
        pic: res.data.profilePicture,
      },
    ]);
  };
  // fetchPosts();
  // } else {
  // setResults(
  //   data.filter((item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
  // }

  const handleOnprofileClick = () => {
    //redirect to freinds profile page

    // console.log("aa");
    // console.log(userProfile);
    // alert("asd");
    const navigateTfrind = () => {
      navigate("/otherprofile", { state: { userProfile: userProfile } });
    };
    navigateTfrind();
  };

  return (
    <div className="search-bar" ref={navbarRef}>
      <p onClick={fetchPosts}>A</p>
      <p onClick={handleOnprofileClick}>b</p>
      <div className="search-bar-wrapper d-flex-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputVisible ? "visible" : ""}
        />

        <img
          src={searchIcon}
          alt=""
          onClick={() => setInputVisible((prevVisible) => !prevVisible)}
        />
      </div>
      {results.length > 0 && (
        <div className="overlay" onClick={() => setResults([])}></div>
      )}
      {results.length > 0 && (
        <div className="search-results card">
          {results.map((result, index) => (
            <div className="search-item d-flex-align-center" key={index}>
              <div className="profile-pic">
                <img src={result.pic} alt="" />
              </div>
              <div className="profile-name">
                <p>{result.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
