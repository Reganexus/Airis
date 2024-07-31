// EntryPageWrapper.tsx (Server Component)
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EntryPage from './EntryPage';

const EntryPageWrapper = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/');
    return null; // The component doesn't need to render anything if redirecting
  }

  return <EntryPage />;
};

export default EntryPageWrapper;
