import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: User['kycStatus'] }) => {
  const variants = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPLIED: "bg-blue-100 text-blue-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800"
  };
  
  const icons = {
    PENDING: <Clock className="h-4 w-4 mr-1" />,
    APPLIED: <FileText className="h-4 w-4 mr-1" />,
    APPROVED: <CheckCircle className="h-4 w-4 mr-1" />,
    REJECTED: <XCircle className="h-4 w-4 mr-1" />
  };
  
  return (
    <Badge className={`flex items-center ${variants[status]}`}>
      {icons[status]}
      {status}
    </Badge>
  );
};