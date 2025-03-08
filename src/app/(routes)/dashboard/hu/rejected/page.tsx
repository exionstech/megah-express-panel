import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import TableAction from "./_components/table/action";
import { auth } from '@clerk/nextjs/server'
import LoaderPage from "@/components/shared/loader";
import RejectedUsersListingPage from "./_components/listing-page";

export const metadata = {
  title: "Rejected Users | Megha Express Panel",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');

  const { userId } = await auth()

  if (!userId) {
    return (
      <LoaderPage />
    )
  }

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="KYC Rejected Users"
            description="View and manage all rejected users"
          />
        </div>
        <Separator />
        <TableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <RejectedUsersListingPage
            userClerkId={userId}
            page={page}
            search={search}
            pageLimit={pageLimit}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
