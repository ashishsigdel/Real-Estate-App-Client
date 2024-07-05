import { getPostById } from "@/services/postServices";
import { PostType } from "@/types/post";
import { useParams } from "next/navigation";
import { useState } from "react";

interface FetchedPostType {
  post: PostType;
  mediaUrls: string[];
}

export default function useGetPost() {
  const params = useParams<{ postId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [post, setPost] = useState<FetchedPostType>({
    post: {} as PostType,
    mediaUrls: [],
  });

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await getPostById(`${params.postId}`);
      setPost(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { fetchPost, post, isLoading };
}
