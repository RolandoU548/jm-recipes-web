// src/components/PortableTextRenderer.tsx
// React island for rendering Sanity Portable Text via @portabletext/react
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface Props {
  value: PortableTextBlock[] | readonly any[];
  className?: string;
}

const myPortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl font-semibold text-bark mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl font-semibold text-bark mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-honey pl-4 italic text-muted my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none space-y-2 mb-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-2 text-gray-700">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-honey shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-bark">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="text-honey underline hover:text-amber-500 transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-6">
        <img
          src={value?.asset?.url ?? ''}
          alt={value?.alt ?? ''}
          className="w-full rounded-2xl object-cover"
        />
        {value?.caption && (
          <figcaption className="text-center text-xs text-muted mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function PortableTextRenderer({ value, className = '' }: Props) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return <p className="text-muted italic">No content available.</p>;
  }
  return (
    <div className={`prose-custom ${className}`}>
      <PortableText value={value as PortableTextBlock[]} components={myPortableTextComponents} />
    </div>
  );
}
