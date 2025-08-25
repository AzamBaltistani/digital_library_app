import api from "./api_login";

// Content types
export interface Content {
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
}

// --- API Functions ---

// Get all contents
export const fetchAllContents = async (): Promise<Content[]> => {
  const response = await api.get("contents/explore/");
  return response.data;
};

// Get free contents
export const fetchFreeContents = async (): Promise<Content[]> => {
  const response = await api.get("contents/explore/all/free/");
  return response.data;
};

// Get borrowable contents
export const fetchBorrowableContents = async (): Promise<Content[]> => {
  const response = await api.get("contents/explore/all/borrowable/");
  return response.data;
};

// Most downloaded
export const fetchMostDownloaded = async (): Promise<Content[]> => {
  const response = await api.get("contents/explore/all/most-downloaded/");
  return response.data;
};

// Most borrowed
export const fetchMostBorrowed = async (): Promise<Content[]> => {
  const response = await api.get("contents/explore/all/most-borrowed/");
  return response.data;
};
