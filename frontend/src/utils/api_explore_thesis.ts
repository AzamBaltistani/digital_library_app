import api from "./api_login";

// Content types
export interface ContentThesis {
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
  thesis_details: {
    university: string | null,
    supervisor: string | null
   };
}

// --- API Functions ---

// Get all contents
export const fetchAllContents = async (): Promise<ContentThesis[]> => {
  const response = await api.get("contents/explore/thesis/");
  return response.data;
};

// Get free contents
export const fetchFreeContents = async (): Promise<ContentThesis[]> => {
  const response = await api.get("contents/explore/thesis/free/");
  return response.data;
};

// Get borrowable contents
export const fetchBorrowableContents = async (): Promise<ContentThesis[]> => {
  const response = await api.get("contents/explore/thesis/borrowable/");
  return response.data;
};

// Most downloaded
export const fetchMostDownloaded = async (): Promise<ContentThesis[]> => {
  const response = await api.get("contents/explore/thesis/most-downloaded/");
  return response.data;
};

// Most borrowed
export const fetchMostBorrowed = async (): Promise<ContentThesis[]> => {
  const response = await api.get("contents/explore/thesis/most-borrowed/");
  return response.data;
};
