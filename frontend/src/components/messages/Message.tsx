import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../hooks/useConversation";
import { MessageType } from "../../types/types";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser?.id;

  const img = fromMe ? authUser?.avatarImg : selectedConversation?.avatarImg;
  const chatClass = fromMe ? "chat-end" : "chat-start";

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img src={img} />
        </div>
      </div>
      <p
        className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}
      >
        {message.content}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};
export default Message;
