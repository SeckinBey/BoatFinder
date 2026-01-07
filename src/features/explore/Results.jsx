import SalesCard from "../../components/SalesCard";

export default function Results({ boatTypes, boats, locations }) {
  const typeMap = Object.fromEntries(boatTypes.map((t) => [t.id, t.name]));
  return (
    <div>
      <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-8 xs:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
        {boats.map((ship) => (
          <SalesCard
            key={ship.id}
            boatTypes={typeMap[ship.typeId]}
            ship={ship}
            locations={locations}
          />
        ))}
      </div>
    </div>
  );
}
