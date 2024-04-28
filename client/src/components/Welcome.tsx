import { useUserContext } from '../contexts/userContext/userContextProvider';

export default function Welcome() {
  const { user } = useUserContext();

  return (
    <div>
      {user && <h1>Hello {user.name}</h1>}
    </div>
  );
}
