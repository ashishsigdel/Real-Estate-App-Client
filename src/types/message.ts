// types.ts
export interface UserProfile {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profilePictureId: {
    _id: string;
    userId: string;
    mediaType: string[];
    fileName: string;
    path: string;
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface User {
  _id: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userProfileId: UserProfile;
}

export interface Message {
  _id: string;
  senderId: User;
  receiverId: User;
  isPostAttached: boolean;
  postAttachedId: string | null;
  message: string;
  editAbleUntil: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
