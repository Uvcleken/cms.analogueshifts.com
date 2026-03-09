"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { type UsersInfo } from "@/types/schema";
import { useUsers } from "@/hooks/users";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function RenderUsers() {
  const [loading, setLoading] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [data, setData] = useState<UsersInfo | null>(null);
  const { getUsers } = useUsers();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [perPage, setPerPage] = useState("");
  const url = "/admin/users?count=50";

  const token = Cookies.get("analogueshiftsCmsToken");

  useEffect(() => {
    if (token) {
      getUsers({ setData, setLoading, url });
    }
  }, [token]);

  const handleFetchMore = (baseUrl: string) => {
    getUsers({
      setData,
      setLoading: setFetchMoreLoading,
      url:
        `${baseUrl?.slice(33)}&count=${perPage?.length > 0 ? perPage : 50}` ||
        "/admin/users?count=50",
    });
  };

  useEffect(() => {
    if (perPage.length > 0) {
      getUsers({
        setData,
        setLoading: setFetchMoreLoading,
        url: `/admin/users?count=${perPage}`,
      });
    }
  }, [perPage]);

  return (
    <div className="w-full flex flex-col gap-5 pt-3 pb-8">
      <h1>All Users ({data?.total || 0})</h1>
      <div className="w-full flex flex-col p-5 rounded-2xl border h-max gap-4">
        <div className="w-full flex justify-between items-center">
          <Input
            type="search"
            className="w-6/12"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Filter user by name"
          />
          <Select value={perPage} onValueChange={(value) => setPerPage(value)}>
            <SelectTrigger className="w-[180px] max-w-[40%]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="500">500</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-max overflow-x-auto">
          <div className="w-full min-w-[1000px] flex flex-col">
            <div className="w-full h-12 border-b items-center grid grid-cols-8">
              <div className="col-span-2 text-[15px] font-medium">Name</div>
              <div className="col-span-2 text-[15px] font-medium">Email</div>
              <div className="col-span-1 text-[15px] font-medium">
                Date Joined
              </div>
              <div className="col-span-1 text-[15px] font-medium">
                Account Type
              </div>
              <div className="col-span-1 text-[15px] font-medium">
                User Type
              </div>
              <div className="col-span-1 text-[15px] font-medium">Action</div>
            </div>
            <div className="w-full overflow-x-auto h-[90dvh] pt-3 max-h-[90dvh] flex flex-col overflow-y-auto">
              {loading
                ? Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <div
                      key={num}
                      className="rounded-md w-full h-12 bg-slate-400/10 animate-pulse mb-2"
                    ></div>
                  ))
                : data?.data
                    ?.filter(
                      (item) =>
                        item?.user_profile?.first_name
                          ?.toLowerCase()
                          ?.includes(searchKeyword?.toLowerCase()) ||
                        item?.user_profile?.last_name
                          ?.toLowerCase()
                          ?.includes(searchKeyword?.toLowerCase())
                    )
                    .map((item, index: number) => {
                      return (
                        <div
                          key={index}
                          className="w-full min-h-14 border-b items-center grid grid-cols-8"
                        >
                          <div className="col-span-2 flex items-center gap-2 text-[15px] font-medium">
                            <Avatar>
                              <AvatarImage
                                src={item?.user_profile?.avatar || undefined}
                              />
                              <AvatarFallback>
                                {item?.email?.slice(0, 1)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {item?.user_profile?.first_name}&nbsp;
                            {item?.user_profile?.last_name}
                          </div>
                          <div className="col-span-2 text-[15px] font-medium">
                            {item?.email}
                          </div>
                          <div className="col-span-1 text-[15px] font-medium">
                            {new Date(item?.created_at).toLocaleDateString()}
                          </div>
                          <div className="col-span-1 text-[15px] font-medium">
                            {item?.user_mode}
                          </div>
                          <div className="col-span-1 text-[15px] font-medium">
                            {item?.user_type}
                          </div>
                          <div className="col-span-1 text-[15px] font-medium">
                            Coming Soon
                          </div>
                        </div>
                      );
                    })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between h-max mt-4 mb-1 items-center">
          <p className="text-[15px] font-medium">
            Viewing page {data?.current_page}
          </p>
          {fetchMoreLoading && (
            <p className="text-[15px] font-medium">Please wait..</p>
          )}
          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => handleFetchMore(data?.prev_page_url || "")}
              variant="outline"
              disabled={data?.prev_page_url ? false : true}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFetchMore(data?.next_page_url || "")}
              disabled={data?.next_page_url ? false : true}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
