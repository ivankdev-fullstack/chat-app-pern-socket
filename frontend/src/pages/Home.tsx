import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg bg-neutral-900 border-1 border-neutral-800 overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
