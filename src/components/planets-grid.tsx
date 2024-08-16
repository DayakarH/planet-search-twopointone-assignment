import { useAppSelector } from "@/hooks/redux-hooks";
import { useSearchPlanetsQuery } from "@/services/planets";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function PlanetsGrid() {
  const { searchText, filters, anyFilterSelected } = useAppSelector(
    (state) => state.searchAndFiltersSlice,
  );
  const {
    data: planets,
    error,
    isSuccess,
  } = useSearchPlanetsQuery({
    searchText,
    filters,
  });
  if (error) {
    return (
      <div className="mt-16 grid max-h-[50dvh] w-full place-items-center">
        <p className="text-destructive-foreground">
          Unable to fetch planets data at this point of time. Please try again
          later
        </p>
      </div>
    );
  }

  if (
    isSuccess &&
    planets.length === 0 &&
    (searchText.length || anyFilterSelected)
  ) {
    return (
      <div className="mt-16 grid max-h-[50dvh] w-full place-items-center">
        <p className="text-destructive-foreground">
          No planets match your filters or search results
        </p>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {isSuccess &&
        planets?.map(({ name, id, description }, idx) => (
          <li key={id}>
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="font-display tracking-wide">
                  {name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <img
                  src={`/${name}.webp`}
                  alt={name}
                  // width={150}
                  className="aspect-square w-full rounded-md object-cover"
                  loading={idx > 2 ? "lazy" : "eager"}
                />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p>{description}</p>
              </CardFooter>
            </Card>
          </li>
        ))}
    </ul>
  );
}
