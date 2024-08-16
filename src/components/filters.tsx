import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useUpdateSearchAndFilters from "@/hooks/use-update-search-and-filters";
import type { FilterCategories, FilterOption } from "@/lib/types";
import {
  useGetColorOptionsQuery,
  useGetShapeOptionsQuery,
  useGetSizeOptionsQuery,
} from "@/services/planets";
import {
  resetFilters,
  setAnyFiltersSelected,
} from "@/store/search-and-filters-slice";
import { FilterX, ListFilter } from "lucide-react";
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
  const hasSelectedFilters = useAppSelector(
    (state) => state.searchAndFiltersSlice.anyFilterSelected,
  );
  return (
    <aside className="hidden space-y-4 border-r py-6 pe-6 shadow-sm md:block">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Filters</h5>
        {hasSelectedFilters ? (
          <div className="text-end">
            <ResetFilters />
          </div>
        ) : null}
      </div>
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
  const hasSelectedFilters = useAppSelector(
    (state) => state.searchAndFiltersSlice.anyFilterSelected,
  );
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 md:hidden"
          variant={"secondary"}
          size={"sm"}
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
        <DialogFooter className="flex flex-row-reverse items-center justify-between">
          <Button size={"lg"} onClick={() => setOpen(false)}>
            Apply
          </Button>
          {hasSelectedFilters ? (
            <div className="text-end">
              <ResetFilters />
            </div>
          ) : null}
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
  const filters = useAppSelector((state) => state.searchAndFiltersSlice.filters);
  const { updateFilters } = useUpdateSearchAndFilters();

  const isChecked = filters[type].includes(filter.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters(type, filter.id, event.target.checked);
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

function ResetFilters() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setAnyFiltersSelected(false));
    dispatch(resetFilters());
  };
  return (
    <Button
      variant={"secondary"}
      className="flex items-center gap-1"
      onClick={handleClick}
      size={"sm"}
    >
      <FilterX width={14} height={14} />
      <span>Reset</span>
    </Button>
  );
}
