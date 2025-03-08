import PageContainer from "@/components/layout/page-container";

export const metadata = {
  title: "Applied Users | Megha Express Panel",
};

type PageProps = { params: Promise<{ productId: string }> };

const UserIdPage = async (props: PageProps) => {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4"></div>
    </PageContainer>
  );
};

export default UserIdPage;
