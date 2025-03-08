import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentImage } from "./document-image";


export const DocumentCard = ({ 
        title, 
        docNumber, 
        frontImage, 
        backImage 
      }: { 
        title: string; 
        docNumber?: string; 
        frontImage?: string; 
        backImage?: string;
      }) => {
        if (!docNumber && !frontImage && !backImage) return null;
        
        return (
          <Card className="overflow-hidden">
            <CardHeader className="p-3 bg-gray-50">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {docNumber && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Document Number</p>
                  <p className="text-sm font-medium">{docNumber}</p>
                </div>
              )}
              
              {(frontImage || backImage) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {frontImage && (
                    <DocumentImage 
                      url={frontImage} 
                      alt={`${title} Front`} 
                      side="Front"
                    />
                  )}
                  
                  {backImage && (
                    <DocumentImage 
                      url={backImage} 
                      alt={`${title} Back`} 
                      side="Back"
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      };