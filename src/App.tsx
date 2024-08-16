import { DesktopFilters, MobileFilters } from "@/components/filters";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PlanetsGrid from "./components/planets-grid";
import SearchBar from "./components/ui/search-bar";

function App() {
  return (
    <>
      <Header />
      <main className="container grid md:grid-cols-[180px,1fr]">
        <DesktopFilters />
        <div className="p-6 max-md:px-0">
          <div className="mb-4 flex justify-end gap-2">
            <SearchBar />
            <MobileFilters />
          </div>
          <PlanetsGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
