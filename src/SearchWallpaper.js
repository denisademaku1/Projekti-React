import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import {
  Row,
  Col,
  Pagination,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import ImageModal from "./components/ImageModal";
import User from "./img/user.jpeg";

const SearchWallpaper = () => {
  const [query, setQuery] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wallpapersPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [navbarColor, setNavbarColor] = useState("");

  const apiKey = "nS3UpX7vONFrH1yFbdg71bxEmiucd3dI";

  useEffect(() => {
    const searchWallpapers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/search?q=${query}&sorting=${sortBy}`,
          {
            headers: {
              "X-API-Key": apiKey,
            },
          }
        );

        const sortedWallpapers = response.data.data.sort((a, b) => {
          if (sortBy === "latest") {
            return new Date(b.created_at) - new Date(a.created_at);
          } else if (sortBy === "most-viewed") {
            return b.views - a.views;
          } else if (sortBy === "toplist") {
            return b.favorites - a.favorites;
          }
        });

        setWallpapers(sortedWallpapers);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    searchWallpapers();
  }, [query, sortBy, apiKey]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newColor = scrollPosition > 100 ? "#F8F4EC" : "white";
      setNavbarColor(newColor);
    };

    window.onscroll = handleScroll;

    return () => {
      window.onscroll = null;
    };
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (wallpaper) => {
    setSelectedImage(wallpaper);
    setShowModal(!showModal);
    console.log("in");
  };

  const handleSortBy = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const indexOfLastWallpaper = currentPage * wallpapersPerPage;
  const indexOfFirstWallpaper = indexOfLastWallpaper - wallpapersPerPage;
  const currentWallpapers = wallpapers.slice(
    indexOfFirstWallpaper,
    indexOfLastWallpaper
  );

  return (
    <div className="text-center d-flex flex-column align-items-center">
      <nav
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: navbarColor,
          zIndex: 100,
          padding: "1% 3%",
        }}
        className="w-100 navbar navbar-expand-lg flex-row align-items-center justify-content-between"
      >
        <a className="navbar-brand d-flex align-items-start" href="#">
          <h1
            className="mb-2"
            style={{ fontFamily: "Rubik Burned", color: "#43766C" }}
          >
            WallHaven
          </h1>
        </a>
        <div className="w-70 d-flex justify-content-end gap-2">
          <Button
            style={{
              border: "1px solid #43766C",
              backgroundColor: sortBy === "latest" ? "#43766C" : "white",
              color: sortBy === "latest" ? "white" : "#43766C",
            }}
            onClick={() => handleSortBy("latest")}
          >
            Latest
          </Button>
          <Button
            style={{
              border: "1px solid #43766C",
              backgroundColor: "#43766C",
              backgroundColor: sortBy === "most-viewed" ? "#43766C" : "white",
              color: sortBy === "most-viewed" ? "white" : "#43766C",
            }}
            onClick={() => handleSortBy("most-viewed")}
          >
            Most Viewed
          </Button>
          <Button
            style={{
              border: "1px solid #43766C",
              backgroundColor: "#43766C",
              backgroundColor: sortBy === "toplist" ? "#43766C" : "white",
              color: sortBy === "toplist" ? "white" : "#43766C",
            }}
            onClick={() => handleSortBy("toplist")}
          >
            Toplist
          </Button>
        </div>
      </nav>
      <div className="w-75">
        <h2
          style={{
            color: "#43766C",
            height: "50%",
          }}
        >
          Elevate your screen with inspiring wallpapers
        </h2>
      </div>

      <div className="p-5">
        <InputGroup className="mb-3">
          <FormControl
            style={{
              borderRadius: "30px",
            }}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wallpapers..."
            aria-label="Search wallpapers"
            aria-describedby="basic-addon2"
          />
        </InputGroup>

        <Row xs={1} md={2} lg={3} xl={4}>
          {currentWallpapers.length > 0 ? (
            currentWallpapers.map((wallpaper) => (
              <Col key={wallpaper.id} className="mb-4">
                <img
                  src={wallpaper.thumbs.large}
                  alt={wallpaper.id}
                  className="img-fluid rounded"
                  onClick={() => handleImageClick(wallpaper)}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="d-flex direction-row align-items-center gap-2">
                    <div className="d-flex direction-row align-items-center gap-2">
                      <img
                        width={25}
                        height={25}
                        style={{ borderRadius: "50%" }}
                        src={User}
                        alt={"John"}
                      />
                      <p className="mt-3">John Doe</p>
                    </div>
                  </div>
                  <div className="d-flex direction-row gap-2">
                    <p className="mt-3">
                      <i class="fa fa-eye" /> {wallpaper.views}
                    </p>
                    <p className="mt-3">
                      <i class="fa fa-heart" /> {wallpaper.favorites}
                    </p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>No results for this search.</p>
          )}
        </Row>

        <Pagination className="mt-3">
          {Array.from(
            { length: Math.ceil(wallpapers.length / wallpapersPerPage) },
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>

      {showModal && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setShowModal(!showModal)}
        />
      )}
    </div>
  );
};

export default SearchWallpaper;
