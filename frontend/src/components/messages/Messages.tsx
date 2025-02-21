import useChatScroll from "../../hooks/useChatScroll";
import useListenMessages from "../../hooks/useListenMessages";
import useGetMessages from "../../hooks/useMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  useListenMessages();

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
