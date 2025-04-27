"use client"

import type React from "react"

import { useState } from "react"
import { useCreateProject } from "../../../hooks/use-create-project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { uploadImage } from "@/lib/upload-image"
import { ImagePlus, Loader2, Star, X } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/api/projects/projects.api";
import { toast } from "sonner";

const ProjectImagesStep = () => {
  const { projectImages, updateProjectImages } = useCreateProject()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      for (const file of files) {
        formData.append("files", file)
      }
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 5
          return newProgress > 95 ? 95 : newProgress
        })
      }, 200)
      
      const imageUrls = await uploadImage(formData)
      
      clearInterval(interval)
      setUploadProgress(100)
      
      const formattedImages = imageUrls.map(url => {
        return {
          link: url,
          isMain: false
        }
      })
      
      const uploadedImages = [...projectImages, ...formattedImages]
      updateProjectImages(uploadedImages)
      
      setTimeout(() => {
        setUploadProgress(0)
      }, 500)
    } catch (error) {
      console.error("Error uploading images:", error)
      toast("Не вдалося завантажити зображення. Спробуйте ще раз.")
    } finally {
      setIsUploading(false)
    }
  }
  
  const removeImage = (index: number) => {
    const updatedImages = [...projectImages]
    updatedImages.splice(index, 1)
    updateProjectImages(updatedImages)
  }
  
  const setMainImage = (index: number) => {
    if (index === 0) return
    
    const updatedImages = [...projectImages]
    const mainImage = updatedImages.splice(index, 1)[0]
    
    if (mainImage) {
      updatedImages.unshift(mainImage)
      updateProjectImages(updatedImages)
    }
  }
  
  return (
    <div className="space-y-6 p-1">
      <div className="space-y-2">
        <Label htmlFor="images">Фотографії проєкту</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <Label htmlFor="images" className="flex flex-col items-center justify-center cursor-pointer">
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium mb-1">Перетягніть файли сюди або клацніть для вибору</span>
            <span className="text-xs text-muted-foreground">Підтримуються формати JPG, PNG, GIF (макс. 5 МБ)</span>
          </Label>
        </div>
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Завантаження...</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      {projectImages.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium">
            Завантажені зображення ({projectImages.length})
            {projectImages.length > 0 && (
              <span className="text-muted-foreground ml-2 text-xs">Перше зображення буде головним</span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projectImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-[4/3] rounded-md overflow-hidden border">
                  <Image
                    src={image.link ?? "/placeholder.svg"}
                    alt={`Project image ${index + 1}`}
                    width={300}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {index !== 0 && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setMainImage(index)}
                      title="Зробити головним"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                    Головне
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectImagesStep;
