import Image from "next/image";
import { ExternalLink } from "lucide-react";


export const DocumentImage = ({ 
  url, 
  alt,
  side 
}: { 
  url: string; 
  alt: string;
  side: string;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{side}</p>
      <div className="relative h-40 w-full rounded overflow-hidden border bg-gray-50">
        <Image 
          src={url} 
          alt={alt} 
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
        >
          <ExternalLink className="h-4 w-4 text-primary" />
        </a>
      </div>
    </div>
  );
};