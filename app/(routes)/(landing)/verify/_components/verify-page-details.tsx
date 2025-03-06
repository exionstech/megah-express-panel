"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaxWidthWrapper } from "@/components/shared/max-wrapper";
import { useUser } from "@/hooks/use-user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@pheralb/toast";
import api from "@/lib/api";
import LoaderPage from "@/components/shared/loader";
import { generateReactHelpers } from "@uploadthing/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUploader from "@/components/common/upload-button";

// Generate the upload helpers
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// Define the form schema
const kycFormSchema = z.object({
  profilePhoto: z.string().min(1, "Profile photo is required"),
  aadhaarNumber: z
    .string()
    .min(12, "Aadhaar number must be 12 digits")
    .max(12, "Aadhaar number must be 12 digits")
    .regex(/^\d+$/, "Aadhaar number must contain only digits"),
  aadhaarFront: z.string().min(1, "Aadhaar front photo is required"),
  aadhaarBack: z.string().min(1, "Aadhaar back photo is required"),
  panNumber: z
    .string()
    .min(10, "PAN number must be 10 characters")
    .max(10, "PAN number must be 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
  panFront: z.string().min(1, "PAN front photo is required"),
  panBack: z.string().min(1, "PAN back photo is required"),
  voterIdNumber: z.string().optional(),
  voterIdFront: z.string().optional(),
  voterIdBack: z.string().optional(),
  drivingLicenseNumber: z.string().optional(),
  drivingLicenseFront: z.string().optional(),
  drivingLicenseBack: z.string().optional(),
  passportNumber: z.string().optional(),
  passportFront: z.string().optional(),
  passportBack: z.string().optional(),
});

type KycFormValues = z.infer<typeof kycFormSchema>;

const VerifyKycPageDetails = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { routeConfig } = useUploadThing("imageUploader");
  const form = useForm<KycFormValues>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: {
      profilePhoto: "",
      aadhaarNumber: "",
      aadhaarFront: "",
      aadhaarBack: "",
      panNumber: "",
      panFront: "",
      panBack: "",
      voterIdNumber: "",
      voterIdFront: "",
      voterIdBack: "",
      drivingLicenseNumber: "",
      drivingLicenseFront: "",
      drivingLicenseBack: "",
      passportNumber: "",
      passportFront: "",
      passportBack: "",
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/onboarding");
    }
  }, [user, isLoading, router]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: KycFormValues) => {
      if (!user) throw new Error("User is not authenticated");
      const res = await api(user.clerkId).post("/kyc/verify", data);
      if (res.status !== 200) throw new Error("Failed to submit KYC details");
      const json = res.data;
      if (!json.success)
        throw new Error(json.message || "Failed to submit KYC details");
      return json;
    },
    onSuccess: () => {
      toast.success({
        text: "KYC verification submitted successfully",
      });
      router.push("/dashboard");
    },
    onError: (error) =>
      toast.error({
        text: error.message || "Failed to submit KYC details",
      }),
  });

  const onSubmit = (data: KycFormValues) => {
    setIsSubmitting(true);
    mutate(data);
  };

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!user && !isLoading) {
    return null;
  }

  return (
    <MaxWidthWrapper className="min-h-screen py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">KYC Verification Process</h1>
        <p className="text-muted-foreground">
          Please Complete Your Verification Process.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Photo Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="w-full aspect-square border border-dashed rounded-lg flex items-center justify-center">
                      {form.watch("profilePhoto") ? (
                        <img
                          src={form.watch("profilePhoto")}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center">
                            <svg
                              className="w-full h-full text-gray-300"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                              />
                              <circle
                                cx="18"
                                cy="5"
                                r="2"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 16.2V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h3.2"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <FormField
                      control={form.control}
                      name="profilePhoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload new photo</FormLabel>
                          <FormControl>
                            <ImageUploader
                              endpoint="imageUploader"
                              onUploadComplete={(url) =>
                                form.setValue("profilePhoto", url)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Please upload square image, size less than 100KB
                          </FormDescription>
                          <div className="text-xs text-red-500 mt-1">
                            *The face should be clearly visible.
                          </div>
                          <div className="text-xs text-red-500">
                            *recommended size is 800x800px
                          </div>
                          <div className="text-xs text-red-500">
                            *The image should be in JPEG or PNG format for
                            compatibility.
                          </div>
                          <div className="text-xs text-red-500">
                            *The image should match with other KYC documents.
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aadhaar Card Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Aadhaar Card*</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload your Aadhaar card below for completing your KYC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="aadhaarNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Card Number*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 12-digit Aadhaar number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="aadhaarFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Aadhaar card front photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("aadhaarFront", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="aadhaarBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Aadhaar card back photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("aadhaarBack", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* PAN Card Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Pan Card*</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload your Pan card below for completing your KYC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pan Card Number*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 10-character PAN number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="panFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Pan card front photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("panFront", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="panBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Pan card back photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("panBack", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Voter ID Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Voter Card</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload your Voter card below for completing your KYC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="voterIdNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voter Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Voter ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="voterIdFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Voter card front photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("voterIdFront", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="voterIdBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Voter card back photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("voterIdBack", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Driving License Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Driving Licence</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload your Driving licence below for completing your KYC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="drivingLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driving Licence Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Driving License number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="drivingLicenseFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Driving licence front photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("drivingLicenseFront", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="drivingLicenseBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Driving licence back photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("drivingLicenseBack", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Passport Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Passport</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please upload your Passport below for completing your KYC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Passport number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="passportFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Passport front photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("passportFront", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="passportBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please upload your Passport back photo
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          endpoint="imageUploader"
                          onUploadComplete={(url) =>
                            form.setValue("passportBack", url)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isPending || isSubmitting}
              className="px-10"
            >
              {isPending ? "Submitting..." : "Apply"}
            </Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default VerifyKycPageDetails;
