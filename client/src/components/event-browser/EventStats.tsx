

interface EventStatsProps {
  totalEvents: number;
  totalCategories: number;
}

export function EventStats({ totalEvents, totalCategories }: EventStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-neutral-800 px-4 py-8 text-center text-white md:grid-cols-4">
      <div>
        <h3 className="text-xl font-bold sm:text-2xl"> {totalEvents} </h3>
        <p className="text-xs uppercase">Events</p>
      </div>
      <div>
        <h2 className="text-xl font-bold sm:text-2xl"> 12K+ </h2>
        <p className="text-xs uppercase">ATTENDEES</p>
      </div>
      <div>
        <h2 className="text-xl font-bold sm:text-2xl"> {totalCategories} </h2>
        <p className="text-xs uppercase">Categories</p>
      </div>
      <div>
        <h2 className="text-xl font-bold sm:text-2xl"> Free </h2>
        <p className="text-xs uppercase">to browse</p>
      </div>
    </div>
  );
}
