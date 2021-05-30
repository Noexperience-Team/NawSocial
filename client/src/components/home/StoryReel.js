import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Story from "./Story";
import "./StoryReel.css";
const StoryReel = () => {
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);

  return (
    <div className="storyReel">
      {/*strory >> img,profilepic,title*/}
      <Story
        image="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/186543102_4419078804769369_5456569980991308256_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=FSRROmRJvHMAX9jOmnN&tn=_XJ8Cr2CWd6mVqJ9&_nc_ht=scontent.ftun4-1.fna&oh=6228a852fc3554a096212735900a6db6&oe=60D71E7B"
        profileSrc={auth.user.avatar}
        title="Bacem Abr"
        theme={theme}
      />
      <Story
        image="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-1/c0.0.320.320a/p320x320/53305599_10210629436810822_6170602024086798336_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=X5kqQvUHBVIAX9ifWqs&_nc_ht=scontent.ftun4-1.fna&tp=27&oh=927b805c7548414c6e602881ef4994f4&oe=60D7888D"
        profileSrc="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-1/c0.0.320.320a/p320x320/53305599_10210629436810822_6170602024086798336_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=X5kqQvUHBVIAX9ifWqs&_nc_ht=scontent.ftun4-1.fna&tp=27&oh=927b805c7548414c6e602881ef4994f4&oe=60D7888D"
        title="Aminos Bouferes"
        theme={theme}
      />
      <Story
        image="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/117584594_2182805405196925_3956462552961537963_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=174925&_nc_ohc=ULCyg2JZRMsAX93nK7t&_nc_oc=AQmCawQsp7ictp2fS371Gjx3B7HhQoZCm-tEcf0DmG5tzru0hHUC2I6drCVctB95hi8&_nc_ht=scontent.ftun4-1.fna&oh=021ec2c740d2ad45843fb9f6939d880c&oe=60D83F3F"
        profileSrc="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/117584594_2182805405196925_3956462552961537963_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=174925&_nc_ohc=ULCyg2JZRMsAX93nK7t&_nc_oc=AQmCawQsp7ictp2fS371Gjx3B7HhQoZCm-tEcf0DmG5tzru0hHUC2I6drCVctB95hi8&_nc_ht=scontent.ftun4-1.fna&oh=021ec2c740d2ad45843fb9f6939d880c&oe=60D83F3F"
        title="Ichrak Gara"
        theme={theme}
      />
      <Story
        image="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/172434362_1802972376543532_3371738289383660161_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=MEmG70BsvLAAX8vQmmP&_nc_ht=scontent.ftun4-1.fna&oh=6404307408a7545a3f6873f05dcc35b7&oe=60D5D244"
        profileSrc="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/172434362_1802972376543532_3371738289383660161_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=MEmG70BsvLAAX8vQmmP&_nc_ht=scontent.ftun4-1.fna&oh=6404307408a7545a3f6873f05dcc35b7&oe=60D5D244"
        title="Malek Ghozzi"
        theme={theme}
      />
    </div>
  );
};

export default StoryReel;
