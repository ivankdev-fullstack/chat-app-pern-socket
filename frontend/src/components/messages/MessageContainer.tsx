import { MessageCircle } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../hooks/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full flex flex-col justify-end">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex justify-center bg-neutral-800 px-4 py-2 text-white font-bold">
            {selectedConversation.fullname}
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
