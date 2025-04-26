"use client"

import { useCreateProject } from "../../../hooks/use-create-project"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"

const productInfoSchema = z.object({
  name: z.string().min(3, "Назва продукту має містити щонайменше 3 символи"),
  amount: z.coerce.number().positive("Кількість має бути більше 0"),
})

export type ProductInfoValues = z.infer<typeof productInfoSchema>

const ProductInfoStep = () => {
  const { productInfo, updateProductInfo } = useCreateProject()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductInfoValues>({
    resolver: zodResolver(productInfoSchema),
    defaultValues: productInfo ?? {
      name: "",
      amount: 1,
    },
  })
  
  // Оновлюємо стан форми при зміні полів
  const formValues = watch()
  
  useEffect(() => {
    updateProductInfo(formValues)
  }, [formValues, updateProductInfo])
  
  // Функція-заглушка для onSubmit, оскільки відправка відбувається в іншому компоненті
  const onSubmit = (data: ProductInfoValues) => {
    console.log(data)
  }
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="product-name"
        label="Назва продукту"
        placeholder="Введіть назву продукту"
        error={errors.name?.message}
        {...register("name")}
      />
      
      <Input
        id="product-amount"
        label="Кількість"
        type="number"
        min={1}
        placeholder="Введіть необхідну кількість"
        error={errors.amount?.message}
        {...register("amount")}
      />
      
      <div className="text-sm text-muted-foreground">
        Вкажіть назву обладнання або продукту, який потрібен для проєкту, та необхідну кількість.
      </div>
    </form>
  )
}

export default ProductInfoStep;
