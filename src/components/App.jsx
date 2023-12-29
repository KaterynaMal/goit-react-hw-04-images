import css from './Styles.module.css';
import { useState, useEffect } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchData } from 'servises/api';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loadMore, setLoadMore] = useState(true);

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);

        const data = await fetchData(searchTerm, page);

        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [page, searchTerm]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={query => setSearchTerm(query)}></Searchbar>
      <ImageGallery images={images} onImageClick={openModal}></ImageGallery>
      {isLoading && <Loader />}
      {loadMore && images.length > 0 && <Button onClick={loadMoreHandler} />}
      {showModal && <Modal largeImage={selectedImage} onClose={closeModal} />}
    </div>
  );
};
