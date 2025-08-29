const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface PropertyType {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export const searchPropertyTypes = async (query?: string): Promise<PropertyType[]> => {
  try {
    const url = query 
      ? `${API_BASE_URL}/property-types/?search=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/property-types/`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching property types:', error);
    throw error;
  }
};
