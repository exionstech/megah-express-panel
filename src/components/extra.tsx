// type kycResponseData = {
//     success: boolean;
//     data: User;
//     message: string;
//   };
  
  
  // const { data: kycData, isLoading: isKycLoading } = useQuery<kycResponseData>({
  //   queryKey: ["get-kyc-details"],
  //   queryFn: async () => {
  //     if (!user?.clerkId) throw new Error("User ID is required");
  //     const response = await api(user.clerkId).get(`/kyc/getdetails`);
  //     if (response.status !== 200)
  //       toast.error({
  //         text: response.data.message || "Failed to fetch KYC details",
  //       });
  //     return response.data;
  //   },
  // });