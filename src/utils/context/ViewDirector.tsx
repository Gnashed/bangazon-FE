import { useAuth } from '@/utils/context/authContext';
import Loading from '@/Components/Loading';
import SignInComponent from '@/Components/SignInComponent';
import NavBar from '@/Components/NavBar';
import { ReactNode } from 'react';

interface ViewDirectorProps {
  children: ReactNode;
}

function ViewDirectorBasedOnUserAuthStatus({ children }: ViewDirectorProps) {
  console.log('ViewDirector is rendering')

  const { user, userLoading } = useAuth();
  console.log("User state in ViewDirector: ", user);
  console.log("UserLoading state: ", userLoading);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
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
