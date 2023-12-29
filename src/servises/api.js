import axios from 'axios';

const fetchData = async (searchTerm, page) => {
  try {
    const apiKey = '40574531-a84246791794da3cbc69c8a1d';
    const perPage = 12;

    const { data } = await axios.get(
      `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export { fetchData };

//  const requestsImagesByQuery = async (searchTerm) => {
//   const apiKey = '40574531-a84246791794da3cbc69c8a1d';
//   const { data } = await axios.get(
//     `https://pixabay.com/api/?q=cat&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return data;
// };

// export { requestsImagesByQuery };
// 40574531-a84246791794da3cbc69c8a1d
