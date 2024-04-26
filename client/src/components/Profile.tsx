import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/userContext/userContextProvider";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user } = useUserContext();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-screen-xl w-full bg-white border border-gray-300 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div> {/* Placeholder for user image */}
          <div>
          </div>
          <div className="flex flex-col ml-4">
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        <div className="mt-8">
          {role === "student" && (
            <div>
              {/* Render student-specific content here */}
              <h2 className="text-xl font-semibold mb-4">Student Dashboard</h2>
              <div className="bg-blue-200 p-6 mb-8 rounded-md">
                <Link to="/progress">Progress</Link>
              </div>
              <div className="bg-blue-200 p-6 mb-8 rounded-md">Classes</div>
              <div className="bg-blue-200 p-6 rounded-md">
                <Link to="/contests">Contests</Link>
              </div>
            </div>
          )}
          {role === "teacher" && (
            <div>
              {/* Render teacher-specific content here */}
              <h2 className="text-xl font-semibold mb-4">Teacher Dashboard</h2>
              <div className="bg-green-200 p-6 mb-8 rounded-md">
                <Link to="/createContest">Create contest</Link>
              </div>
              <div className="bg-blue-200 p-6 rounded-md">
                <Link to="/contests">Contests</Link>
              </div>
              {/* Add more teacher-specific sections as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
