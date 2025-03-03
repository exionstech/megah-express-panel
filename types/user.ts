interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  mobile?: string;
  avatar?: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  kycStatus: "PENDING" | "APPROVED" | "REJECTED";
  kycDocuments: {
    aadharCard: string;
    panCard: string;
    voterCard?: string;
    passport?: string;
    photo: string;
    drivingLicence?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
