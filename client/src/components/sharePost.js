import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import "../styles/components/sharePost.scss";
import facebookIcon from "../assets/svgs/facebook.svg";
import whatsappIcon from "../assets/svgs/whatsapp.svg";
import twitterIcon from "../assets/svgs/twitter.svg";
import gmailIcon from "../assets/svgs/gmail.svg";
import copyIcon from "../assets/svgs/copy.svg";

const SharePost = ({ url, onShare }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="share-dialog">
      <div className="share-buttons">
        <FacebookShareButton url={url} quote="Check out this post!">
          <img src={facebookIcon} alt="Share on Facebook" />
          <p>Facebook</p>
        </FacebookShareButton>
        <TwitterShareButton url={url} title="Check out this post!">
          <img src={twitterIcon} alt="Share on Twitter" />
          <p>Twitter</p>
        </TwitterShareButton>
        <WhatsappShareButton url={url} title="Check out this post!">
          <img src={whatsappIcon} alt="Share on WhatsApp" />
          <p>WhatsApp</p>
        </WhatsappShareButton>
        <EmailShareButton url={url} subject="Check out this post!">
          <img src={gmailIcon} alt="Share via Email" />
          <p>Email</p>
        </EmailShareButton>
        <button onClick={handleCopyClick}>
          <img src={copyIcon} alt="Copy link" />
          <p>{linkCopied ? "Copied" : "Copy link"}</p>
        </button>
      </div>
    </div>
  );
};

export default SharePost;
