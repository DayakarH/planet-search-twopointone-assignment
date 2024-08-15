import Filters from "@/components/filters";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useSearchPlanetsQuery } from "@/services/planets";
import PlanetsGrid from "./components/planets-grid";
import SearchBar from "./components/ui/search-bar";

function App() {
  const { searchText, filters } = useAppSelector(
    (state) => state.searchAndFiltersSlice,
  );
  const { data: planets } = useSearchPlanetsQuery({ searchText, filters });
  return (
    <>
      <Header />
      <main className="container grid sm:grid-cols-[150px,1fr]">
        <Filters />
        <div className="p-4 max-sm:px-0">
          <div className="mb-2 text-end">
            <SearchBar />
          </div>
          <PlanetsGrid planets={planets} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
