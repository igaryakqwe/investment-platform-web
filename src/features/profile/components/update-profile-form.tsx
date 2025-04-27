"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

import { updateUser, updateUserAvatar } from "@/api/users/users.api";
import { updateUserSchema, type UserUpdateDto } from "@/api/users/users.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/types/user";
import { serialize } from "v8";

interface ProfileUpdateFormProps {
  user: User;
  closeModal: () => void;
}

const ProfileUpdateForm = ({ user, closeModal }: ProfileUpdateFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.avatarLink,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserUpdateDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      middleName: user.middleName ?? "",
      lastName: user.lastName ?? "",
      name: user.name ?? "",

      newPassword: "",
    },
  });

  const submitHandler = async (data: UserUpdateDto) => {
    if (!selectedImage) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      await updateUserAvatar(formData);

      await updateUser(data, user.id);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile successfully updated");
      reset();
      closeModal();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mx-1 space-y-6">
      <div className="mb-6 flex flex-col items-center space-y-4">
        <Label
          htmlFor="profileImage"
          className="self-start text-sm font-medium"
        >
          Profile Photo
        </Label>
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={triggerFileInput}
            className="group relative cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative h-32 w-32 overflow-hidden rounded-full border">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelectedImage();
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="bg-muted/30 group-hover:bg-muted/50 flex h-32 w-32 items-center justify-center rounded-full border border-dashed transition-colors">
                <Camera className="text-muted-foreground h-8 w-8" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground text-xs">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {!user.isLegal && (
          <>
            <Input
              id="name"
              label="Name"
              error={errors.name?.message}
              placeholder="Organization name or full name"
              {...register("name")}
            />
            <Textarea
              id="description"
              label="Description"
              error={errors.description?.message}
              placeholder="Short description"
              {...register("description")}
            />
          </>
        )}

        {user.isLegal && (
          <>
            <Input
              id="firstName"
              label="First Name"
              error={errors.firstName?.message}
              placeholder="Ivan"
              {...register("firstName")}
            />

            <Input
              id="middleName"
              label="Middle Name"
              error={errors.middleName?.message}
              placeholder="Petrovych"
              {...register("middleName")}
            />

            <Input
              id="lastName"
              label="Last Name"
              error={errors.lastName?.message}
              placeholder="Kovalenko"
              {...register("lastName")}
            />
          </>
        )}
      </div>

      <div className="space-y-4">
        <Input
          id="currentPassword"
          type="password"
          label="Current Password"
          error={errors.currentPassword?.message}
          placeholder="••••••••"
          {...register("currentPassword")}
        />

        <Input
          id="newPassword"
          type="password"
          label="New Password"
          error={errors.newPassword?.message}
          placeholder="••••••••"
          {...register("newPassword")}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-end gap-2 pt-2">
          {closeModal && (
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          )}
          <Button isLoading={isSubmitting} type="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
