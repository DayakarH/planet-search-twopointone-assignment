export type Planet = {
  id: string;
  name: string;
  shape: string;
  color: string;
  size: string;
  description: string;
};
export type Filters = {
  color: Array<string>;
  shape: Array<string>;
  size: Array<string>;
};

export type SearchAndFilters = {
  searchText: string;
  filters: Filters;
};

export type FilterOption = {
  id: string;
  name: string;
};

export type FilterCategories = keyof Filters;
