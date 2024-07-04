import { getAllCategory } from "@/services/categoryServices";
import { useState } from "react";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function usePost() {
  const [allCategory, setAllCategory] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const response = await getAllCategory();
      setAllCategory(response.data || []); // Ensure we set an array
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllCategory([]); // Set to empty array on error
    }
  };

  return {
    getAllCategory: getCategories,
    allCategory,
  };
}
