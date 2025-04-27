"use client";

import { format } from "date-fns";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { socket } from "@/lib/socket";
import useAuthStore from "@/store/use-auth-store";
import useChatStore from "@/store/use-chat-store";
import { type User } from "@/types/user";
import { cn } from "@/utils/styles.utils";
import { getFullName, getUserName } from "@/utils/user.utils";

interface Message {
  id: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  content: string;
  sender: User;
  receiver: User;
}

const ChatInterface = () => {
  const user = useAuthStore((state) => state.user);
  const { chats, receiverId } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit("join", {
      senderId: user.id,
      receiverId,
    });

    socket.on("join", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("join");
      socket.off("message");
      socket.emit("leave", {
        senderId: user.id,
        receiverId,
      });
    };
  }, [user?.id, receiverId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user?.id) return;

    const messageData = {
      senderId: user.id,
      receiverId,
      content: newMessage,
    };

    socket.emit("message", messageData);
    setNewMessage("");
  };

  const isOwnMessage = (message: Message) => {
    if (!user?.id) return false;

    return message.senderId === user.id;
  };

  const getSenderName = (message: Message) => {
    if (isOwnMessage(message)) return "";

    return message.sender?.name;
  };

  const getSenderAvatar = (message: Message) => {
    if (isOwnMessage(message)) return user?.avatarLink;

    return message.sender?.avatarLink;
  };

  return (
    <div className="flex w-full flex-col shadow-lg">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <UserAvatar
            image={user?.avatarLink}
            className="h-8 w-8 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-semibold">
              {getUserName(user?.name, user?.firstName, user?.lastName)}
            </div>
            <div className="text-muted-foreground text-[12px]">
              {user?.email}
            </div>
          </div>
        </div>
      </div>

      {chats && (
        <div className="overflow-x-auto border-b px-4 py-2">
          <div className="flex w-max gap-2">
            {chats?.map((chat) => {
              return (
                <Button
                  key={chat?.id}
                  variant={chat.id === receiverId ? "secondary" : "ghost"}
                  size="sm"
                  className="flex items-center gap-2 py-1"
                  onClick={() => useChatStore.setState({ receiverId: chat.id })}
                >
                  <UserAvatar
                    image={chat?.avatarLink}
                    className="h-6 w-6 flex-shrink-0"
                  />
                  <div className="text-left">
                    <div className="max-w-[100px] truncate text-xs font-medium">
                      {getFullName(
                        chat?.firstName,
                        chat?.lastName,
                        chat?.middleName,
                        chat?.name,
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {messages.length ? (
        <div
          ref={messagesContainerRef}
          className="no-scrollbar h-[300px] space-y-4 overflow-y-auto p-4"
        >
          {messages.map((message, index) => {
            const isOwn = isOwnMessage(message);
            return (
              <div
                key={message.id || index}
                className={cn(
                  "mb-4 flex",
                  isOwn ? "justify-end" : "justify-start",
                )}
              >
                {!isOwn && (
                  <UserAvatar
                    image={getSenderAvatar(message)}
                    className="mr-2 h-8 w-8 flex-shrink-0"
                  />
                )}

                <div
                  className={cn("max-w-[70%]", isOwn ? "order-1" : "order-2")}
                >
                  <div
                    className={cn(
                      "mb-1 flex items-baseline",
                      isOwn ? "justify-end" : "justify-start",
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {getSenderName(message)}
                    </span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {format(new Date(message.createdAt), "HH:mm")}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "w-fit rounded-2xl px-3 py-2 text-sm break-words",
                      isOwn
                        ? "bg-primary rounded-tr-none text-white"
                        : "bg-muted rounded-tl-none",
                    )}
                  >
                    {message.content}
                  </div>
                </div>

                {isOwn && (
                  <UserAvatar
                    image={user?.avatarLink}
                    className="order-last ml-2 h-8 w-8 flex-shrink-0"
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-muted-foreground grid h-[300px] place-items-center text-center">
          Почніть спілкування
        </div>
      )}

      <div className="mt-auto w-full border-t p-4">
        <form onSubmit={sendMessage} className="flex w-full items-center gap-2">
          <Input
            placeholder="Введіть повідомлення..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon" className="inline-flex">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
