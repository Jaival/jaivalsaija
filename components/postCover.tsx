import Image from 'next/image';
import type { PostCover as Cover } from '@/utils/interface';

/** A post's cover at 16:9, cropped to fill. Only rendered when one is set. */
export default function PostCover({
  cover,
  sizes,
  priority = false,
  className = '',
}: {
  cover: Cover;
  /** The rendered width per breakpoint, so Next serves the right size. */
  sizes: string;
  /** Set on the post page, where the cover is the LCP element. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted ${className}`}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover'
      />
    </div>
  );
}
