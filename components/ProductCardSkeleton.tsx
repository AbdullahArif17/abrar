export function ProductCardSkeleton() {
  return (
    <div className="bg-card/40 border border-border/40 rounded-[2.5rem] overflow-hidden animate-pulse flex flex-col h-full">
      <div className="aspect-square bg-muted/20 flex-shrink-0" />
      <div className="p-7 flex flex-col flex-1 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-muted/20 rounded-full w-20" />
            <div className="h-5 bg-muted/20 rounded-full w-16" />
          </div>
          <div className="h-7 bg-muted/20 rounded-xl w-3/4" />
          <div className="h-7 bg-muted/20 rounded-xl w-1/2" />
          <div className="h-4 bg-muted/20 rounded-full w-24" />
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/40 space-y-4">
          <div className="h-8 bg-muted/20 rounded-xl w-1/3" />
          <div className="h-12 bg-muted/20 rounded-2xl w-full" />
        </div>
      </div>
    </div>
  );
}
