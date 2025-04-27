"use client";

import { EditIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileUpdateForm from "@/features/profile/components/update-profile-form";
import useAuthStore from "@/store/use-auth-store";

const ProfileUpdateModal = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<EditIcon />} className="w-full" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Fill out the form to update your profile. You can change personal information, contact details, and other settings.
          </DialogDescription>
        </DialogHeader>
        {user && <ProfileUpdateForm user={user} closeModal={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
