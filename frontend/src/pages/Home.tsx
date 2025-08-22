import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const Home: FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { selectedUser } = useSelector((state) => state.users);

  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
