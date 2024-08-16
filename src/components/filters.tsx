import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import type { FilterCategories, FilterOption } from "@/lib/types";
import {
  useGetColorOptionsQuery,
  useGetShapeOptionsQuery,
  useGetSizeOptionsQuery,
} from "@/services/planets";
import { setFilters } from "@/store/search-and-filters-slice";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function DesktopFilters() {
  const { data: colorOptions } = useGetColorOptionsQuery();
  const { data: shapeOptions } = useGetShapeOptionsQuery();
  const { data: sizeOptions } = useGetSizeOptionsQuery();
  return (
    <aside className="hidden space-y-4 border-r py-6 shadow-sm md:block">
      <FilterSection filterOptions={colorOptions} label="color" />
      <FilterSection filterOptions={sizeOptions} label="size" />
      <FilterSection filterOptions={shapeOptions} label="shape" />
    </aside>
  );
}

export function MobileFilters() {
  const { data: colorOptions } = useGetColorOptionsQuery();
  const { data: shapeOptions } = useGetShapeOptionsQuery();
  const { data: sizeOptions } = useGetSizeOptionsQuery();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 md:hidden"
          variant={"secondary"}
        >
          <ListFilter />
          <span>Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Filters</DialogTitle>
        </DialogHeader>
        <div className="max-h-[50dvh] space-y-4 overflow-y-auto">
          <FilterSection filterOptions={colorOptions} label="color" />
          <FilterSection filterOptions={sizeOptions} label="size" />
          <FilterSection filterOptions={shapeOptions} label="shape" />
        </div>
        <DialogFooter className="flex flex-row items-center justify-end">
          <Button size={"lg"} onClick={() => setOpen(false)}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function FilterSection({
  filterOptions,
  label,
}: {
  filterOptions: Array<FilterOption> | undefined;
  label: FilterCategories;
}) {
  return (
    <div className="space-y-2">
      <p className="font-display font-medium capitalize">{label}</p>
      <ul className="space-y-1.5">
        {filterOptions?.map((shape) => (
          <li key={shape.id}>
            <Filter filter={shape} type={label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Filter({
  filter,
  type,
}: {
  filter: FilterOption;
  type: FilterCategories;
}) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.searchAndFiltersSlice);

  const isChecked = filters[type].includes(filter.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      [type]: event.target.checked
        ? [...filters[type], filter.id]
        : filters[type].filter((id) => id !== filter.id),
    };

    dispatch(setFilters(newFilters));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(type);
    newFilters[type].forEach((id) => searchParams.append(type, id));

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="flex items-center gap-1">
      <Input
        type="checkbox"
        id={filter.id}
        checked={isChecked}
        onChange={handleChange}
        className="h-4 w-4 cursor-pointer"
      />
      <Label htmlFor={filter.id} className="font-normal">
        {filter.name}
      </Label>
    </div>
  );
}
