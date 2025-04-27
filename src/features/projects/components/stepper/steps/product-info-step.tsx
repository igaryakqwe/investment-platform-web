"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import { cn } from "@/utils/styles.utils"
import { useCreateProjectContext } from "@/context/create-project-context"

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
})

type ProductFormValues = z.infer<typeof productSchema>

const ProductInfoStep = () => {
  const { products, addProduct, updateProduct, removeProduct } = useCreateProjectContext()
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", amount: 1 },
    mode: "onChange",
  })
  
  const onSubmit = (data: ProductFormValues) => {
    if (editingProductId) {
      updateProduct({ id: editingProductId, ...data })
      setEditingProductId(null)
    } else {
      addProduct({ id: `product-${Date.now()}`, ...data })
    }
    reset({ name: "", amount: 1 })
  }
  
  const startEditing = (product: { id: string; name: string; amount: number }) => {
    setEditingProductId(product.id)
    reset({ name: product.name, amount: product.amount })
  }
  
  const cancelEditing = () => {
    setEditingProductId(null)
    reset({ name: "", amount: 1 })
  }
  
  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add products needed for the project</h3>
        <p className="text-sm text-muted-foreground">
          Specify the name of the equipment or product and the required quantity. You can add several different products.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="product-name"
            label="Product name"
            placeholder="Enter product name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            id="product-amount"
            label="Amount"
            type="number"
            min={1}
            placeholder="Enter required amount"
            error={errors.amount?.message}
            {...register("amount")}
          />
        </div>
        <div className="flex justify-end gap-2">
          {editingProductId && (
            <Button type="button" variant="outline" size="sm" onClick={cancelEditing}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm" disabled={!isValid}>
            {editingProductId ? (
              <>
                <Save className="mr-1 h-4 w-4" />
                Save changes
              </>
            ) : (
              <>
                <Plus className="mr-1 h-4 w-4" />
                Add product
              </>
            )}
          </Button>
        </div>
      </form>
      {products.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Added products ({products.length})</h4>
          <div className="border rounded-md divide-y">
            {products.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "flex items-center justify-between p-3",
                  editingProductId === product.id && "bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">{product.name}</div>
                  <Badge variant="outline" className="ml-2">
                    {product.amount} pcs.
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(product)}
                    disabled={editingProductId !== null}
                  >
                    <Edit2 className="h-4 w-4" /><span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProduct(product.id)}
                    disabled={editingProductId !== null}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" /><span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No products added yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Add at least one product to proceed with project creation
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductInfoStep
