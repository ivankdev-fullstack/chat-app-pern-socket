import { MessageType } from "../../types/types";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }: { message: MessageType }) => {
  return (
    <div className="flex gap-2 justify-end">
      <div className="text-white bg-sky-600 text-sm px-2 py-1 rounded-md rounded-br-none flex flex-col items-end">
        <p className="min-w-[50px] max-w-[400px] whitespace-pre-wrap break-words h-auto text-end">
          {message.content}
        </p>
        <p className="opacity-50 text-xs text-white text-start w-full">
          {extractTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};
export default Message;
