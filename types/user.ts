type KycDocuments = {
  aadharCardNo: string;
  panCardNo: string;
  voterCardNo?: string;
  passportNo?: string;
  drivingLicenceNo?: string;
  aadharCardFront: string;
  aadharCardBack: string;
  panCardFront: string;
  panCardBack: string;
  voterCardFont?: string;
  voterCardBack?: string;
  passportFront?: string;
  passportBack?: string;
  drivingLicenceFront?: string;
  drivingLicenceBack?: string;
};

type User = {
  id: string;
  clerkId: string;
  anem: string;
  email: string;
  mobile: string;
  avatar: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  kycStatus: "PENDING"| "APPLIED" | "APPROVED" | "REJECTED";
  kycDocuments: KycDocuments;
  createdAt: Date;
  updatedAt: Date;
};
