export type PostType = {
  title: string;
  description: string;
  featureImagesId: string[];
  category: string;
  country: string;
  city: string;
  address: string;
  media: File[];
  userId: string;
  price: number;
  discountStatus: boolean;
  discountPrice: number;
  status: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ItemTypes = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
