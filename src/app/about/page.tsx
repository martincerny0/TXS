import { getServerAuthSession } from '@/server/auth';
import AboutPage from './AboutPage';

export const metadata = {
  title: 'About | TXS ',
};

export default async function Page() {
    const session = await getServerAuthSession();
  
  return <AboutPage user={session?.user} />;
}
