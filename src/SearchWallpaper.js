import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, InputGroup, FormControl } from 'react-bootstrap';

const SearchWallpaper = () => {
  const [query, setQuery] = useState('');
  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wallpapersPerPage] = useState(12);
  const apiKey = 'nS3UpX7vONFrH1yFbdg71bxEmiucd3dI';

  useEffect(() => {
    const searchWallpapers = async () => {
      try {
        const response = await axios.get(`/api/v1/search?q=${query}`, {
          headers: {
            'X-API-Key': apiKey,
          },
        });

        const sortedWallpapers = response.data.data.sort((a, b) => b.views - a.views);
        setWallpapers(sortedWallpapers);
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
      }
    };

    searchWallpapers();
  }, [query, apiKey]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastWallpaper = currentPage * wallpapersPerPage;
  const indexOfFirstWallpaper = indexOfLastWallpaper - wallpapersPerPage;
  const currentWallpapers = wallpapers.slice(indexOfFirstWallpaper, indexOfLastWallpaper);

  return (
    <Container className="text-center d-flex flex-column align-items-center mt-5">
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
        {/* You can add a clear button if needed */}
        {/* <Button variant="outline-secondary">Clear</Button> */}
      </InputGroup>

      {/* Wallpapers Display */}
      <Row xs={1} md={2} lg={3} xl={4}>
        {currentWallpapers.length > 0 ? (
          currentWallpapers.map((wallpaper) => (
            <Col key={wallpaper.id} className="mb-4">
              <img src={wallpaper.thumbs.large} alt={wallpaper.id} className="img-fluid rounded" />
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
        {Array.from({ length: Math.ceil(wallpapers.length / wallpapersPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default SearchWallpaper;
