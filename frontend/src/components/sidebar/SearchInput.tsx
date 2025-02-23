import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../hooks/useConversation";
import useConversations from "../../hooks/useConversations";
import { ConversationType } from "../../types/types";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center pb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm input-bordered w-full text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
export default SearchInput;
