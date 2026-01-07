import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <article className="card-hover border border-border/30">
      <div className="space-y-4">
        {/* Image skeleton */}
        <Skeleton 
          className="w-full rounded-lg" 
          style={{ aspectRatio: "704 / 384" }} 
        />

        {/* Category and read time */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />

        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Date */}
        <div className="pt-2 border-t border-border">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </article>
  );
}

export function BlogPostSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}
