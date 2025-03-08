import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { Loader2 } from "lucide-react";
import { UserDetails } from "./_components/user-details";
import { Heading } from "@/components/ui/heading";

export const metadata = {
  title: "User Details | Megha Express Panel",
};

type PageProps = { params: Promise<{ userId: string }> };

const UserIdPage = async (props: PageProps) => {
  const params = await props.params;
  const userId = params.userId;

  return (
    <PageContainer scrollable>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="User Details"
            description="Show user details"
          />
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <UserDetails userId={userId} />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default UserIdPage;
