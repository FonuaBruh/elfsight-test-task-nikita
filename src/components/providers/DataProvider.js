import axios from 'axios';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [filters, setFilters] = useState(null);

  const handleSetFilters = useCallback(
    (status, gender, species, name, type) => {
      setActivePage(0);

      if (!status && !gender && !species && !name && !type) {
        setFilters(null);

        return;
      }
      setFilters({
        status,
        gender,
        species,
        name,
        type
      });
    },
    []
  );

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    let url = apiURL;

    url += `?page=${activePage + 1}`;

    if (filters) {
      let params = '';

      if (filters.status) params += `&status=${filters.status}`;
      if (filters.gender) params += `&gender=${filters.gender}`;
      if (filters.species) params += `&species=${filters.species}`;
      if (filters.name) params += `&name=${filters.name}`;
      if (filters.type) params += `&type=${filters.type}`;

      url += params;
    }

    fetchData(url);
  }, [activePage, apiURL, fetchData, filters]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      setFilters: handleSetFilters,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [
      activePage,
      apiURL,
      handleSetFilters,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
