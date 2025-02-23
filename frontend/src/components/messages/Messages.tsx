import { useAuthContext } from "../../context/AuthContext";
import useChatScroll from "../../hooks/useChatScroll";
import useListenMessages from "../../hooks/useListenMessages";
import useGetMessages from "../../hooks/useMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import ParticipantMessage from "./ParticipantMessage";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const { authUser } = useAuthContext();
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  useListenMessages();

  if (!loading && messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-center text-neutral-500 text-sm">
        Send a message to start the conversation
      </div>
    );
  }

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (
        <div className="flex flex-col gap-3 py-2">
          {messages.map((message) => {
            const fromMe = message?.senderId === authUser?.id;
            if (fromMe) {
              return <Message key={message.id} message={message} />;
            }
            return <ParticipantMessage key={message.id} message={message} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Messages;
