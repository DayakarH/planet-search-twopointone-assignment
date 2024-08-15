import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setSearchText } from "@/store/search-and-filters-slice";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(
    (state) => state.searchAndFiltersSlice.searchText,
  );
  const [value, setValue] = useState(searchText);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchText(value));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("q");
    if (value) searchParams.append("q", value);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };
  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg items-center gap-2">
      <Input
        value={value}
        name="searchTerm"
        onChange={(evt) => setValue(evt.target.value)}
        className="bg-white"
      />
      <Button size={"icon"} variant={"default"}>
        <SearchIcon />
      </Button>
    </form>
  );
}
function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
      {...props}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
