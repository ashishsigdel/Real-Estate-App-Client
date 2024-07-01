import React from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  return (
    <div className="border-r border-lightcolor dark:border-darkcolor p-5 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
}
