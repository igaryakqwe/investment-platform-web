import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FileBoxIcon,
  Loader2,
  User,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useUserQuery from "@/hooks/use-user-query";
import { Progress } from "@/components/ui/progress";
import type { Products } from "@/types/project";
import useCreateInvestmentMutation from "@/features/project/hooks/use-create-investment-mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CreateInvestmentModalProps {
  products: Products[];
}

const CreateInvestmentModal = ({ products }: CreateInvestmentModalProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [step, setStep] = useState<"user" | "product" | "amount">("user");
  const queryClient = useQueryClient();

  const { users, isLoading } = useUserQuery(email);

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const { isCreatingInvestment, createInvestment } =
    useCreateInvestmentMutation();

  const calculateRemainingAmount = (product: Products) => {
    const totalInvested =
      product.investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
    return product.amount - totalInvested;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInvestmentAmount(value);
  };

  const handleNextStep = () => {
    if (step === "user" && selectedUserId) {
      setStep("product");
    } else if (step === "product" && selectedProductId) {
      setStep("amount");
    }
  };

  const handlePrevStep = () => {
    if (step === "product") {
      setStep("user");
    } else if (step === "amount") {
      setStep("product");
    }
  };

  const handleSubmit = async () => {
    if (!selectedUserId || !selectedProductId || !investmentAmount) {
      return;
    }

    try {
      await createInvestment({
        userId: selectedUserId,
        productId: selectedProductId,
        amount: parseInt(investmentAmount),
      });

      await queryClient.invalidateQueries({
        queryKey: ["investments"],
      });
      toast.success("Congratulations!!!", {
        description: "Investments created!",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Error creating investment", {
        description: "Please try again later.",
      });
    }

    setEmail("");
    setSelectedUserId("");
    setSelectedProductId("");
    setInvestmentAmount("");
    setStep("user");
  };

  const getStepTitle = () => {
    switch (step) {
      case "user":
        return "Select User";
      case "product":
        return "Select Product";
      case "amount":
        return "Investment Amount";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "user":
        return "Search for a user by email and select them";
      case "product":
        return "Choose which product to invest in";
      case "amount":
        return "Enter the investment amount";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          <FileBoxIcon className="mr-2 h-4 w-4" />
          Create investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4 px-1 py-2">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{getStepTitle()}</h3>
              <div className="flex gap-1">
                <div
                  className={`h-2 w-2 rounded-full ${step === "user" ? "bg-blue-500" : "bg-gray-300"}`}
                />
                <div
                  className={`h-2 w-2 rounded-full ${step === "product" ? "bg-blue-500" : "bg-gray-300"}`}
                />
                <div
                  className={`h-2 w-2 rounded-full ${step === "amount" ? "bg-blue-500" : "bg-gray-300"}`}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">{getStepDescription()}</p>
          </div>

          {step === "user" && (
            <>
              <div>
                <Input
                  placeholder="Enter user email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2"
                />
              </div>

              <div className="rounded-md border">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  </div>
                ) : users && users.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className={`flex cursor-pointer items-center border-b p-3 last:border-b-0 hover:bg-gray-50 ${
                          selectedUserId === user.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        <div className="flex-shrink-0">
                          {user.avatarLink ? (
                            <img
                              src={user.avatarLink}
                              alt={user.name ?? user.email}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium">
                            {user.name ??
                              `${user.firstName ?? ""} ${user.lastName ?? ""}`}
                            {!user.name &&
                              !user.firstName &&
                              !user.lastName &&
                              user.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div
                            className={`h-4 w-4 rounded-full border ${
                              selectedUserId === user.id
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedUserId === user.id && (
                              <div className="flex h-full w-full items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : email ? (
                  <div className="p-4 text-center text-gray-500">
                    No users found with that email
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Enter an email to search for users
                  </div>
                )}
              </div>
            </>
          )}

          {step === "product" && (
            <div className="rounded-md border">
              <div className="max-h-60 overflow-y-auto">
                {products.map((product) => {
                  const remainingAmount = calculateRemainingAmount(product);
                  const fundingPercent =
                    ((product.amount - remainingAmount) / product.amount) * 100;

                  return (
                    <div
                      key={product.id}
                      className={`flex cursor-pointer flex-col border-b p-3 last:border-b-0 hover:bg-gray-50 ${
                        selectedProductId === product.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">{product.name}</div>
                        <div
                          className={`h-4 w-4 rounded-full border ${
                            selectedProductId === product.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedProductId === product.id && (
                            <div className="flex h-full w-full items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        {product.description}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-gray-500">
                        <span>Funding Progress</span>
                        <span>{fundingPercent.toFixed(0)}%</span>
                      </div>
                      <Progress value={fundingPercent} className="mb-2 h-1.5" />
                      <div className="text-sm font-medium">
                        Remaining: {remainingAmount.toLocaleString()} of{" "}
                        {product.amount.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === "amount" && selectedProduct && (
            <div className="space-y-4">
              <div className="rounded-md bg-blue-50 p-3">
                <div className="mb-1 text-sm font-medium">Selected Product</div>
                <div className="text-lg">{selectedProduct.name}</div>
                <div className="mt-1 text-sm text-gray-600">
                  Remaining:{" "}
                  {calculateRemainingAmount(selectedProduct).toLocaleString()}{" "}
                  of {selectedProduct.amount.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Investment Amount
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    placeholder="Enter amount..."
                    inputMode="numeric"
                    value={investmentAmount}
                    onChange={handleAmountChange}
                    className="pl-9"
                    type="text"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Maximum amount:{" "}
                  {calculateRemainingAmount(selectedProduct).toLocaleString()}
                </p>

                {investmentAmount && Number(investmentAmount) > 0 && (
                  <div className="mt-4 rounded-md bg-green-50 p-3">
                    <div className="text-sm font-medium text-green-800">
                      Investment Summary
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-sm text-gray-600">Product:</span>
                      <span className="text-sm font-medium">
                        {selectedProduct.name}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium">
                        {Number(investmentAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step !== "user" ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <div></div> // Empty div for spacing
            )}

            {step === "amount" ? (
              <Button
                onClick={handleSubmit}
                disabled={!investmentAmount || Number(investmentAmount) <= 0}
                isLoading={isCreatingInvestment}
              >
                Complete
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                disabled={
                  (step === "user" && !selectedUserId) ||
                  (step === "product" && !selectedProductId)
                }
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvestmentModal;
