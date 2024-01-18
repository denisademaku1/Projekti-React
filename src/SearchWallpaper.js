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
  const [sortBy, setSortBy] = useState("");
  const [navbarColor, setNavbarColor] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("All");

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

          return 0;
        });

        setWallpapers(sortedWallpapers);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      }
    };

    searchWallpapers();
  }, [query, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newColor = scrollPosition > 100 ? "#43766c" : "white";
      setNavbarColor(newColor);
    };

    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    window.onscroll = handleScroll;

    return () => {
      window.onscroll = null;
    };
  }, [showModal]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (wallpaper) => {
    setSelectedImage(wallpaper);
    setShowModal(!showModal);
  };

  const handleSortBy = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const handleResolutionChange = (event) => {
    setSelectedResolution(event.target.value);
  };
  const filterWallpapers = () => {
    if (selectedResolution === "All") {
      return wallpapers;
    }

    const [width, height] = selectedResolution.split("x");
    const selectedWidth = parseInt(width, 10);
    const selectedHeight = parseInt(height, 10);

    return wallpapers.filter((wallpaper) => {
      const [wallpaperWidth, wallpaperHeight] = wallpaper.resolution.split("x");
      const parsedWallpaperWidth = parseInt(wallpaperWidth, 10);
      const parsedWallpaperHeight = parseInt(wallpaperHeight, 10);

      return (
        parsedWallpaperWidth >= selectedWidth &&
        parsedWallpaperHeight >= selectedHeight
      );
    });
  };

  const indexOfLastWallpaper = currentPage * wallpapersPerPage;
  const indexOfFirstWallpaper = indexOfLastWallpaper - wallpapersPerPage;
  const currentWallpapers = filterWallpapers().slice(
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
        <button
          className="navbar-brand d-flex align-items-start"
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <h1
            className="mb-2"
            style={{ fontFamily: "Rubik Burned", color: "#263A29" }}
          >
            WallHaven
          </h1>
        </button>
        <div className="w-100 d-flex justify-content-end gap-2">
          <select
            id="resolution"
            value={selectedResolution}
            onChange={handleResolutionChange}
            style={{
              marginLeft: "1rem",
              backgroundColor:
                selectedResolution === "All" ? "#fff" : "#263A29",
              color: selectedResolution === "All" ? "#263A29" : "#fff",
              border: "1px solid #263A29",
              borderRadius: "10px",
              padding: "0 1%",
            }}
          >
            <option value="All">All Resolutions</option>
            <option value="1024x768">1024x768 </option>
            <option value="1280x720">1280x720</option>
            <option value="1366x768">1366x768</option>
            <option value="1600x900">1600x900 </option>
          </select>

          <Button
            style={{
              border: "1px solid #263A29",
              backgroundColor: sortBy === "latest" ? "#263A29" : "white",
              color: sortBy === "latest" ? "white" : "#263A29",
            }}
            onClick={() => handleSortBy("latest")}
          >
            Latest
          </Button>
          <Button
            style={{
              border: "1px solid #263A29",
              backgroundColor: sortBy === "most-viewed" ? "#263A29" : "white",
              color: sortBy === "most-viewed" ? "white" : "#263A29",
            }}
            onClick={() => handleSortBy("most-viewed")}
          >
            Most Viewed
          </Button>
          <Button
            style={{
              border: "1px solid #263A29",
              backgroundColor: sortBy === "toplist" ? "#263A29" : "white",
              color: sortBy === "toplist" ? "white" : "#263A29",
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
            color: "#263A29",
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
            id="form"
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
                <div
                  style={{
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    borderRadius: "10px",
                    padding: "1% 2%",
                  }}
                >
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
                        <i className="fa fa-eye" /> {wallpaper.views}
                      </p>
                      <p className="mt-3">
                        <i className="fa fa-heart" /> {wallpaper.favorites}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p className="w-100">No results for this search.</p>
          )}
        </Row>
        <Pagination className="custom-pagination mt-3 d-flex align-items-center justify-content-center">
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
