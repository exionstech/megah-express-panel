import Image from "next/image";


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
      </div>
    </div>
  );
};