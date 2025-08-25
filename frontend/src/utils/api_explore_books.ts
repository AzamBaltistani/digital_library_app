import api from "./api_login";

// Content types
export interface ContentBook {
  id: number;
  title: string;
  description: string;
  content_type: string;
  price_buy: string | null;
  price_borrow: string | null;
  is_free: boolean;
  discount_percentage: number;
  download_count: number;
  borrowed_count: number;
  review: string | null;
  author_name: string;
  created_at: string;
  book_details: {
    publication_year: string | null,
    volume_number: string | null    
  };
}

// --- API Functions ---

// Get all contents
export const fetchAllContents = async (): Promise<ContentBook[]> => {
  const response = await api.get("contents/explore/books/");
  return response.data;
};

// Get free contents
export const fetchFreeContents = async (): Promise<ContentBook[]> => {
  const response = await api.get("contents/explore/books/free/");
  return response.data;
};

// Get borrowable contents
export const fetchBorrowableContents = async (): Promise<ContentBook[]> => {
  const response = await api.get("contents/explore/books/borrowable/");
  return response.data;
};

// Most downloaded
export const fetchMostDownloaded = async (): Promise<ContentBook[]> => {
  const response = await api.get("contents/explore/books/most-downloaded/");
  return response.data;
};

// Most borrowed
export const fetchMostBorrowed = async (): Promise<ContentBook[]> => {
  const response = await api.get("contents/explore/books/most-borrowed/");
  return response.data;
};
