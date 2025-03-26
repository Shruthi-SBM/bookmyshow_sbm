import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./movie_card/MovieCard";
import "../style/home.css";
import Menubar from "./menubar/Menubar";
import PrivacyNote from "./privacyNote/PrivacyNote";
import Footer from "./footer/Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LocationPicker from "./LocationPickup/LocationPicker";
import { AppContext } from "../contexts/AppContext";
import Navbar from "./navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

export default function () {
  const [movies, setMovies] = useState([]);

  const imagesCard = [
    "https://static.toiimg.com/photo/68371772.cms?imgsize=665262",
    "https://lumiere-a.akamaihd.net/v1/images/rochelle_instagram_teaser2_poster_united_kingdom_3_db347906.jpeg?region=0,100,800,800",
    "https://data1.ibtimes.co.in/photo/en/full/91286/announcing-launch-trailer-his-upcoming-film-actor-akshay-kumar-took-twitter-share-new.jpg?w=800",
    "https://proxy.imagearchive.com/8dd/8dd10ccd50ed56922112d2b55e52fb98.jpg",
    "https://media.licdn.com/dms/image/v2/D5622AQF4teQ4nsoIYA/feedshare-shrink_800/feedshare-shrink_800/0/1733058509648?e=2147483647&v=beta&t=Po3_7rj7_HjM_G54tqDYMzWosxJBlYSWBVrsQ86ZXHc",
  ];

  const [showModal, setShowModal] = useState(false);
  let { city, handleChange } = useContext(AppContext);

  console.log(city, handleChange);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveheight: false,
    autoplay: true,
    autoplaySpeed: 2599,
  };
  function handleClose(e) {
    setShowModal(false);
  }

  function toggleLocationPickup(e) {
    console.log(e);
    let set = !showModal;
    setShowModal(set);
  }

  useEffect(async () => {
    window.addEventListener("load", (e) => {
      setShowModal(true);
    });
    //        let data=await axios.get(`${process.env.REACT_APP_HOST}/movies`,{});

    fetch("http://localhost:5000/movies", { mode: "cors" })
      .then((res) => {
        res.json().then((data) => {
          console.log("data", data);
          setMovies(data);
        });
      })
      .catch((e) => {
        console.error(e);
      });
    //console.log(data.data);
    //setMovies(data.data);
  }, []);

  return (
    <>
      <Modal
        size="xl"
        show={showModal}
        onHide={handleClose}
        style={{}}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <LocationPicker handleClose={handleClose} />
        </Modal.Body>

        <p className="red">View All Cities</p>
      </Modal>

      <Navbar toggle={toggleLocationPickup} />
      <Menubar />

      <Slider
        {...settings}
        style={{
          maxWidth: "100%",
          maxHeight: "324px",
          marginRight: "20px",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1639378314392_revisedbanner2.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1639051788302_sunburn.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1637323134871_divinepunyapaaptour_webshowcase_1240x300.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
      </Slider>

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Recommended Movies</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`}>
              <MovieCard
                title={el.title}
                image={el.img_url}
                tag={el.genre[0]}
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>

      <br />

      <img
        className="img-fluid padded-img"
        src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/lead-in-v3-collection-202102040828.png"
      />

      <br />

      <p className="heading-4">The Best Of Entertainment</p>

      <div className="image-flex">
        <br />

        {imagesCard.map((el) => {
          return <img src={el} />;
        })}
      </div>

      <br />

      <div className="premier-container">
        <img
          className="img-fluid padded-img "
          src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
        />

        <br />
        <br />

        <div className="container-fluid movies-list">
          {movies.map((el, index) => {
            return (
              <Link to={`/movie/${el._id}`}>
                <MovieCard
                  title={el.title}
                  image={el.img_url}
                  tag={el.genre[0]}
                  headingColor="white"
                  subHeadColor="white"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`}>
              <MovieCard
                title={el.title}
                image={el.img_url}
                tag={el.genre[0]}
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`}>
              <MovieCard
                title={el.title}
                image={el.img_url}
                tag={el.genre[0]}
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`}>
              <MovieCard
                title={el.title}
                image={el.img_url}
                tag={el.genre[0]}
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`}>
              <MovieCard
                title={el.title}
                image={el.img_url}
                tag={el.genre[0]}
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      {/* <PrivacyNote /> */}
      <Footer />
    </>
  );
}
