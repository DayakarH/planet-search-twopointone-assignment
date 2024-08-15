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
    <ul className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {planets?.map(({ name, id, description }) => (
        <li key={id}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`/${name}.webp`}
                alt={name}
                className="aspect-video rounded-sm object-cover"
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
