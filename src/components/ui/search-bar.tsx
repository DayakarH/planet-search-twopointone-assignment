import { useAppSelector } from "@/hooks/redux-hooks";
import useUpdateSearchAndFilters from "@/hooks/use-update-search-and-filters";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function SearchBar() {
  const { updateSearchTerm } = useUpdateSearchAndFilters();
  const searchText = useAppSelector(
    (state) => state.searchAndFiltersSlice.searchText,
  );
  const [value, setValue] = useState(searchText);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchTerm(value);
  };
  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg items-center gap-2">
      <Input
        value={value}
        name="searchTerm"
        type="search"
        onChange={(evt) => setValue(evt.target.value)}
        className="bg-white"
        placeholder='"Earth"'
      />
      <Button size={"icon"} variant={"default"}>
        <SearchIcon />
      </Button>
    </form>
  );
}
