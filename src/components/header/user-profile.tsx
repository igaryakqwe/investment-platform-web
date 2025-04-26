
"use client";

import Link from "next/link";

import AuthButtons from "@/components/header/auth-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { ROUTES } from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";
import { cn } from "@/utils/styles.utils";
import { getFullName } from "@/utils/user.utils";

const UserProfile = () => {
  const { user, isLoading } = useAuthStore();

  const userName = getFullName(user?.firstName, user?.lastName, user?.middleName, user?.name);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (!user && !isLoading) return <AuthButtons />;

  return (
    <Link
      href={ROUTES.PROFILE}
      className={cn(
        "flex items-center justify-center gap-3 hover:bg-transparent",
      )}
    >
      <div className="flex flex-col">
        <span className="text-right text-sm font-medium">
          {userName}
        </span>
        <span className="text-right text-xs text-muted-foreground">
          {user?.email}
        </span>
      </div>
      <UserAvatar image={user?.avatarLink}  />
    </Link>
  );
};

export default UserProfile;
