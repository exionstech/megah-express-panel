
import { SearchParams } from 'nuqs/server';
import DashboardPageDetails from './_components/dashboard-page-details'

export const metadata = {
  title: 'Dashboard | Megha Express Panle'
};


type pageProps = {
  searchParams: Promise<SearchParams>;
};

const DashboardPage = () => {
  return (
    <DashboardPageDetails />
  )
}

export default DashboardPage