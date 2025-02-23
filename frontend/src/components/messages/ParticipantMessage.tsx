import useConversation from "../../hooks/useConversation";
import { MessageType } from "../../types/types";
import { extractTime } from "../../utils/extractTime";

const ParticipantMessage = ({ message }: { message: MessageType }) => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex items-end gap-2">
      <img className="w-8 rounded-full" src={selectedConversation?.avatarImg} />
      <div className="text-white bg-sky-600 text-sm px-2 py-1 rounded-md rounded-bl-none flex flex-col items-start">
        <p className="max-w-[80%]">{message.content}</p>
        <p className="opacity-50 text-xs text-white text-end w-full">
          {extractTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};
export default ParticipantMessage;
