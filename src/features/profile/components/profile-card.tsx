"use client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { ROUTES } from "@/constants/navigation";
import ProfileCardSkeleton from "@/features/profile/components/profile-card-skeleton";
import UpdateProfileModal from "@/features/profile/components/update-profile-modal";
import useAuthStore from "@/store/use-auth-store";
import { logoutUser, removeAuthToken } from "@/utils/auth.utils";
import { getFullName } from "@/utils/user.utils";

const ProfileCard = () => {
  const { replace } = useRouter();
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  const fullName = getFullName(
    user?.firstName,
    user?.lastName,
    user?.middleName,
    user?.name,
  );

  const handleSignOut = () => {
    removeAuthToken();
    replace(ROUTES.HOME);
    logoutUser();
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Badge className="absolute -top-2 -left-2">Approved</Badge>
          <div className="flex flex-col items-center">
            <div>
              <UserAvatar
                size={24}
                image={user?.avatarLink}
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <UpdateProfileModal />
          <Button
            icon={<LogOutIcon />}
            className="w-full"
            variant="destructive"
            onClick={handleSignOut}
          >
            Вийти
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
