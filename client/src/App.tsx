import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import ProfilePage from "./components/Profile";
import Navbar from "./components/Navbar/Navbar";
import { useUserContext } from "./contexts/userContext/userContextProvider";
import Users from "./components/Users";
import Contests from "./components/Contest/Contests";
import CreateContest from "./components/Contest/CreateContest";
import ContestDetails from "./components/Contest/ContestsDetails";
import LandingPage from "./pages/LandingPage";
import Progress from "./components/Progress/Progress";
import ContestManagement from "./components/Contest/ContestManagement";
import Goals from "./components/Progress/Goals";
import Home from "./pages/Home/Home";
import HomeContent from "./pages/Home/components/HomeContent";
import CreateContestDetails from "./components/Contest/CreateContestDetails";
import ContestRoom from "./components/Contest/ContestRoom";
import MyContests from "./components/Profile/MyContests";
import Test from "./components/Test";
import ClassInfoForm from "./components/Classes/ClassInfoForm";

const App = () => {
  const { user } = useUserContext();

  return (
    <>
    <ClassInfoForm />
    <Test />
      {/* <Navbar /> <ContestManagement />
      <Routes>
        <Route
          path="/createcontestDetails"
          element={<CreateContestDetails />}
        />
        <Route path="/goals" element={<Goals />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        {user && <Route path="/profile" element={<ProfilePage />} />}
        {user && <Route path="/contests" element={<Contests />} />}
        <Route path="/users" element={<Users />} />
        {user?.role === "teacher" && (
          <Route path="/createContest" element={<CreateContest />} />
        )}
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="progress" element={<Home />} />
        <Route path="/contestroom/:id" element={<ContestRoom />} />
      </Routes>
      <MyContests /> */}
    </>
  );
};

export default App;
