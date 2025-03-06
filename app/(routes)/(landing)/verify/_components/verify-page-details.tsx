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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/common/upload-button";
import Image from "next/image";
import UploaderSmallButton from "@/components/common/upload-small-button";
import CustomIcon from "@/components/shared/custom-icon";
import { ChevronRight } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-number-input";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const kycFormSchema = z.object({
  profilePhoto: z.string().min(1, "Profile photo is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be 10 digits"),
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
  const form = useForm<KycFormValues>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: {
      profilePhoto:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      phone: "+918389849446",
      name: user?.name || "",
      email: user?.email || "",
      aadhaarNumber: "123456789123",
      aadhaarFront:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      aadhaarBack:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      panNumber: "HBQPD3089G",
      panFront:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      panBack:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      voterIdNumber: "123456789123",
      voterIdFront:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      voterIdBack:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      drivingLicenseNumber: "123456789123",
      drivingLicenseFront:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      drivingLicenseBack:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      passportNumber: "123456789123",
      passportFront:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
      passportBack:
        "https://2zek8lj0x9.ufs.sh/f/x6c1qp2r3WfDwj2OZMyqLObpBqDtUwKIPn1rQliuYNvMZWsf",
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
      const apiData = {
        id: user.id,
        name: data.name,
        email: data.email,
        mobile: data.phone,
        avatar: data.profilePhoto,
        kycDocuments: {
          aadharCardFront: data.aadhaarFront,
          aadharCardBack: data.aadhaarBack,
          panCardFront: data.panFront,
          panCardBack: data.panBack,
          voterCardFront: data.voterIdFront || "",
          voterCardBack: data.voterIdBack || "",
          passportFront: data.passportFront || "",
          passportBack: data.passportBack || "",
          drivingLicenceFront: data.drivingLicenseFront || "",
          drivingLicenceBack: data.drivingLicenseBack || "",
        },
      };
      const res = await api(user.clerkId).post("/kyc/apply", apiData);
      if (res.status !== 200) throw new Error("Failed to submit KYC details");
      const json = res.data;
      if (!json.success)
        throw new Error(json.message || "Failed to submit KYC details");
      return json;
    },
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success({
        text: "KYC verification submitted successfully",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error({
        text: error.message || "Failed to submit KYC details",
      });
    },
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Profile Photo Section */}
            <div className="w-full md:w-[60%] flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="w-[50%] md:w-[20%] aspect-square overflow-hidden border-[2px] border-dashed border-brandblue rounded-lg flex items-center justify-center">
                {form.watch("profilePhoto") ? (
                  <Image
                    src={form.watch("profilePhoto")}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <CustomIcon src={"/kyc/kyc-profile.svg"} size={50} />
                  </div>
                )}
              </div>
              <div className="w-full md:w-[80%]">
                <FormField
                  control={form.control}
                  name="profilePhoto"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex md:gap-5 gap-2 flex-col md:flex-row md:items-center">
                        <FormControl>
                          <UploaderSmallButton
                            endpoint="imageUploader"
                            onUploadComplete={(url) =>
                              form.setValue("profilePhoto", url)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Please upload square image, size less than 100KB
                        </FormDescription>
                      </div>
                      <div className="text-xs mt-3">
                        *The face should be clearly visible.
                      </div>
                      <div className="text-xs">
                        *recommended size is 800x800px
                      </div>
                      <div className="text-xs">
                        *The image should be in JPEG or PNG format for
                        compatibility.
                      </div>
                      <div className="text-xs">
                        *The image should match with other KYC documents.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full md:w-[40%]">
              {/* mobile number section */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-4">Mobile Number*</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please enter your mobile number below for completing your
                    KYC.
                  </p>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number*</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter your mobile number"
                            {...field}
                            defaultCountry="IN"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Name Section */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-4">Name*</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please enter your name below for completing your KYC.
                  </p>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Email Section */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-4">Email*</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please enter your email below for completing your KYC.
                  </p>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>  
            </div>
          </div>

          {/* Aadhaar Card Section */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Aadhaar Card*</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your Aadhaar card below for completing your KYC.
                </p>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Pan Card*</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your Pan card below for completing your KYC.
                </p>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Voter Card</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your Voter card below for completing your KYC.
                </p>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Driving Licence</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your Driving licence below for completing your
                  KYC.
                </p>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Passport</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your Passport below for completing your KYC.
                </p>
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
              className="px-10 bg-brandred hover:bg-brandred/70 font-semibold"
            >
              {isPending ? (
                "Submitting..."
              ) : (
                <div className="flex items-center gap-2">
                  Submit
                  <ChevronRight />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default VerifyKycPageDetails;
