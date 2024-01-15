import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import {
  Container,
  Row,
  Col,
  Pagination,
  InputGroup,
  FormControl,
  Modal,
  Button,
} from "react-bootstrap";
import ImageModal from "./components/ImageModal";
import logo from "./img/logo.png";

const SearchWallpaper = () => {
  const [query, setQuery] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wallpapersPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (wallpaper) => {
    setSelectedImage(wallpaper);
    setShowModal(true);
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
    <Container className="text-center d-flex flex-column align-items-center mt-5">
      <nav className="w-100 navbar navbar-expand-lg flex-row align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-start" href="#">
          <h1
            className="mb-2"
            style={{ fontFamily: "Rubik Burned", color: "#43766C" }}
          >
            WallHaven
          </h1>
        </a>
        <div className="w-70 mb-3 d-flex justify-content-end gap-2">
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
      {/* Sort Buttons */}

      {/* Search Input */}
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search wallpapers..."
          aria-label="Search wallpapers"
          aria-describedby="basic-addon2"
        />
      </InputGroup>

      {/* Wallpapers Display */}
      <Row xs={1} md={2} lg={3} xl={4}>
        {currentWallpapers.length > 0 ? (
          currentWallpapers.map((wallpaper) => (
            <Col
              key={wallpaper.id}
              className="mb-4"
              onClick={() => handleImageClick(wallpaper)}
            >
              <img
                src={wallpaper.thumbs.large}
                alt={wallpaper.id}
                className="img-fluid rounded"
              />
              <p className="mt-2">Views: {wallpaper.views}</p>
              <p>Favorites: {wallpaper.favorites}</p>
            </Col>
          ))
        ) : (
          <p>No results for this search.</p>
        )}
      </Row>

      {/* Pagination */}
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

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Original Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && <ImageModal selectedImage={selectedImage} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SearchWallpaper;
