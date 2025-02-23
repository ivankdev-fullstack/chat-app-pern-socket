import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../hooks/useConversation";
import { ConversationType } from "../../types/types";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?.id === conversation.id;
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-neutral-700 rounded-md p-2
				 py-1 cursor-pointer ${isSelected ? "bg-neutral-800" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div
          className={`w-8 md:w-12 rounded-full avatar ${
            isOnline ? "online" : ""
          }`}
        >
          <img src={conversation.avatarImg} alt="user avatar" />
        </div>

        <div className="flex flex-1 gap-3 justify-between items-center">
          <p className="font-bold text-gray-200 text-sm md:text-md">
            {conversation.fullname}
          </p>
        </div>
      </div>
    </>
  );
};
export default Conversation;
