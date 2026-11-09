import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Hero = ({ posts, getText }) => {
  const [index, setIndex] = useState(0);
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    let random = posts.sort(() => 0.5 - Math.random()).slice(0, 4);
    setRandomPosts(random);
  }, [posts]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    //  ======= Hero Slider Section =======
    <div className="pb-4">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {randomPosts.map((post) => (
          <Carousel.Item key={post.id}>
            <img
              className="d-block img-fluid m-auto"
              src={`../upload/${post.img}`}
              alt=""
            />
            <Link to={`/post/${post.id}`}>
              <Carousel.Caption>
                <h3> {post.title}</h3>
                <p>{getText(post.desc).substring(0, 50)}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
