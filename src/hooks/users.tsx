import axios from "@/lib/axios";

import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { type UsersInfo } from "@/types/schema";

interface GetUsersParams {
  url: string;
  setLoading: (loading: boolean) => void;
  setData: (data: UsersInfo) => void;
}

export const useUsers = () => {
  const router = useRouter();

  const getUsers = async ({ setLoading, setData, url }: GetUsersParams) => {
    const token = Cookies.get("analogueshiftsCmsToken");
    setLoading(true);
    try {
      const response = await axios.request({
        url: url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200) {
        setData(response.data.data.users);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 401) {
        Cookies.remove("analogueshiftsCmsToken");
        router.push("/");
      }
    }
  };

  return {
    getUsers,
  };
};
