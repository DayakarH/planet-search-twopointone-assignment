import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import type { FilterCategories, FilterOption } from "@/lib/types";
import {
  useGetColorOptionsQuery,
  useGetShapeOptionsQuery,
  useGetSizeOptionsQuery,
} from "@/services/planets";
import { setFilters } from "@/store/search-and-filters-slice";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Filters() {
  const { data: colorOptions } = useGetColorOptionsQuery();
  const { data: shapeOptions } = useGetShapeOptionsQuery();
  const { data: sizeOptions } = useGetSizeOptionsQuery();
  return (
    <aside className="hidden space-y-4 border-r py-4 shadow-sm sm:block">
      <FilterSection filterOptions={colorOptions} label="color" />
      <FilterSection filterOptions={sizeOptions} label="size" />
      <FilterSection filterOptions={shapeOptions} label="shape" />
    </aside>
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
        className="h-4 w-4"
      />
      <Label htmlFor={filter.id} className="font-normal">
        {filter.name}
      </Label>
    </div>
  );
}
