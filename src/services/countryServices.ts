import { myAxios } from "@/services/apiServices";

interface CountryForm {
  name: String;
}

export const getAllCountry = async () => {
  try {
    const response = await myAxios.get("country");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCountryById = async (id: string) => {
  try {
    const response = await myAxios.get(`/country/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addCountry = async (data: CountryForm) => {
  try {
    const response = await myAxios.post("/categories", data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateCountry = async (data: CountryForm, id: number) => {
  try {
    const response = await myAxios.put(`/country/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCountry = async (id: number) => {
  try {
    const response = await myAxios.delete(`/country/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
