import { useEffect, useState } from 'react';
import { getUsers } from '../firebase/userOperations';
import { IUser } from '../models';

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.email}>
            <strong>User ID:</strong> {user.email}, <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Role:</strong> {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
