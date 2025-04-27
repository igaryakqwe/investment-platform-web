"use client";

import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

import { getUserChats } from "@/api/users/users.api";
import ChatInterface from "@/components/chat/chat-interface";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuthStore from "@/store/use-auth-store";
import useChatStore from "@/store/use-chat-store";

const ChatPopover = () => {
  const { chats, setChats, isChatOpen, setIsChatOpen } = useChatStore();

  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: () => getUserChats(user?.id ?? ""),
  });

  useEffect(() => {
    if (!chats?.length && !isLoading && data) {
      setChats(data);
    }
  }, [data, chats?.length, isLoading]);

  if (!user) return null;

  return (
    <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed right-4 bottom-4 h-12 w-12 rounded-full"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="max-w-[400px] p-0">
        <ChatInterface />
      </PopoverContent>
    </Popover>
  );
};

export default ChatPopover;
