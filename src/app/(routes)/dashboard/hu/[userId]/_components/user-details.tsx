"use client";

import ApiInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "./status-badge";
import { DocumentCard } from "./document-card";


type User = {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  kycStatus: "PENDING"| "APPLIED" | "APPROVED" | "REJECTED";
  kycDocuments: string | KycDocuments;
  createdAt: Date;
  updatedAt: Date;
};

type ApiResponse = {
  success: boolean;
  user: User;
  message: string;
};

export const UserDetails = ({ userId }: { userId: string }) => {
  const { data: response, isLoading } = useQuery<ApiResponse>({
    queryKey: ["getuser", userId],
    queryFn: async () => {
      const response = await ApiInstance(userId).get("/auth/getuser", {
        params: { userId },
      });
      return response.data;
    },
  });

  console.log(response);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading user data...</p>
      </div>
    );
  }

  // Check if response exists
  if (!response || !response.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Failed to load user data</p>
      </div>
    );
  }

  const user = response.user;
  
  // Parse KYC documents if it's a string
  const kycDocuments: KycDocuments | null = typeof user.kycDocuments === 'string' 
    ? JSON.parse(user.kycDocuments) 
    : user.kycDocuments as KycDocuments;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4 border-2 border-primary/10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <StatusBadge status={user.kycStatus} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Information</h3>
              <Separator />

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="col-span-2 font-medium">{user.email}</span>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <span className="text-muted-foreground">Mobile:</span>
                  <span className="col-span-2 font-medium">{user.mobile}</span>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="col-span-2 font-medium">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              <Separator />

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-muted-foreground">KYC Status:</span>
                  <div className="col-span-2">
                    <StatusBadge status={user.kycStatus} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user.kycStatus !== "PENDING" && kycDocuments && (
            <div className="mt-8">
              <Tabs defaultValue="mandatory" className="w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold">KYC Documents</h3>
                  <TabsList>
                    <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
                    <TabsTrigger value="optional">Optional</TabsTrigger>
                  </TabsList>
                </div>

                <Separator className="mb-6" />

                <TabsContent value="mandatory" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentCard
                      title="Aadhar Card"
                      docNumber={kycDocuments.aadharCardNo}
                      frontImage={kycDocuments.aadharCardFront}
                      backImage={kycDocuments.aadharCardBack}
                    />

                    <DocumentCard
                      title="PAN Card"
                      docNumber={kycDocuments.panCardNo}
                      frontImage={kycDocuments.panCardFront}
                      backImage={kycDocuments.panCardBack}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="optional" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DocumentCard
                      title="Voter Card"
                      docNumber={kycDocuments.voterCardNo}
                      frontImage={kycDocuments.voterCardFont}
                      backImage={kycDocuments.voterCardBack}
                    />

                    <DocumentCard
                      title="Passport"
                      docNumber={kycDocuments.passportNo}
                      frontImage={kycDocuments.passportFront}
                      backImage={kycDocuments.passportBack}
                    />

                    <DocumentCard
                      title="Driving Licence"
                      docNumber={kycDocuments.drivingLicenceNo}
                      frontImage={kycDocuments.drivingLicenceFront}
                      backImage={kycDocuments.drivingLicenceBack}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};