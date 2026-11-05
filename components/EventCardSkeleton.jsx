export default function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton mt-4 h-12 w-full" />
      </div>
    </div>
  );
}