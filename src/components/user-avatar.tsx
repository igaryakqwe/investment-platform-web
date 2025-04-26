import { UserRoundIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  image?: string | null;
  className?: string;
  size?: number;
}

const UserAvatar = ({ image, className, size = 16 }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={image!} />
      <AvatarFallback>
        <UserRoundIcon
          size={size}
          className="text-gray-500"
          aria-hidden="true"
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
