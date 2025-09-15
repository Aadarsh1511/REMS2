// src/context/SearchContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface SearchState {
  keyword: string;
  location: string;
  propertyType: string;
}

interface SearchContextType {
  searchParams: SearchState;
  setSearchParams: (params: Partial<SearchState>) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParamsState] = useState<SearchState>({
    keyword: '',
    location: '',
    propertyType: '',
  });

  const setSearchParams = (params: Partial<SearchState>) => {
    setSearchParamsState(prev => ({ ...prev, ...params }));
  };

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
