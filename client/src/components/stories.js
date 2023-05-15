import React from 'react'
import arrowRight from '../assets/pictures/arrowcircleright.png';
import arrowLeft from '../assets/pictures/arrowcircleleft.png';
import StoryPic from '../assets/pictures/Mask.png';
import profilePic from '../assets/pictures/Ellipse.png';
import '../styles/components/stories.scss'

const stories = () => {
  return (
    <div class="container-middle">
      <div class="arrow">
        <div class="rightArrow">
          <img src={arrowRight} alt="" />
        </div>
        <div class="leftArrow">
          <img src={arrowLeft} alt="" />
        </div>
      </div>
      <div class="stories-container">
        <div class="stories-content">

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>
          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>
          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>
          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>
          </div>
          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>

          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>

          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>

          </div>

          <div class="stories-group">
            <div class="stories-img">
              <img src={StoryPic} alt="" />
            </div>
            <div class="stories-blob">
              <div class="mask-stories">
                <div class="circle">
                  <img src={profilePic} alt="" />
                </div>
                <span>Lorem ipsum</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default stories