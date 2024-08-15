import type { Planet } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export default function PlanetsGrid({
  planets,
}: {
  planets: Array<Planet> | undefined;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {planets?.map((planet) => (
        <li key={planet.id}>
          <Card>
            <CardContent className="pt-6">
              <p>{planet.name}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
