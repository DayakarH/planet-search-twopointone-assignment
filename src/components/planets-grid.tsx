import type { Planet } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function PlanetsGrid({
  planets,
}: {
  planets: Array<Planet> | undefined;
}) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {planets?.map(({ name, id, description }) => (
        <li key={id}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display tracking-wide">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`/${name}.webp`}
                alt={name}
                className="aspect-square rounded-md object-cover"
              />
            </CardContent>
            <CardFooter>
              <p>{description}</p>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
