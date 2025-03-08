import { useAuth } from '@/utils/context/authContext';
import Loading from '@/Components/Loading';
import SignInComponent from '@/Components/SignInComponent';
import NavBar from '@/Components/NavBar';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface ViewDirectorProps {
  children: ReactNode;
}

function ViewDirectorBasedOnUserAuthStatus({ children }: ViewDirectorProps) {
  console.log('ViewDirector is rendering')

  const { user, userLoading } = useAuth();
  const pathname = usePathname();

  console.log("User state in ViewDirector: ", user);
  console.log("UserLoading state: ", userLoading);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // NOTE: This allows unauthenticated users to access the register page. For some reason, Next.js is having issues rendering the register page after I imported Link from next/link. To get around this, excluding the register page from authentication enforcement needed.
  // Step 1 - import { usePathname } from 'next/navigation';
  // Step 2 - const pathname = usePathname(); --- add this above the if statement that checks userLoading.
  // Step 3 - Below this line, add the logic that should return the register component.
  if (!user && pathname === "/register") {
    return children;
  }
  if (!user && pathname === "/login") {
    return children;
  }
  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        {children}
      </>
    );
  }

  return <SignInComponent />;
}

export default ViewDirectorBasedOnUserAuthStatus;
