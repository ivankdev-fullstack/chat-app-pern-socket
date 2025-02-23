import useConversations from "../../hooks/useConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations, loading } = useConversations();

  return (
    <div className="flex flex-col overflow-auto gap-1">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
