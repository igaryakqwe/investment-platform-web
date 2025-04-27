"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Send,
  FileBoxIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import useProjectQuery from "@/hooks/use-project-query";
import type { Products } from "@/types/project";
import CreateInvestmentModal from "@/features/project/components/create-investment-modal";
import useAuthStore from "@/store/use-auth-store";
import UserAvatar from "@/components/user-avatar";
import { getUserName } from "@/utils/user.utils";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateProgress = (products: Products[]) => {
  if (!Array.isArray(products)) return { percent: 0, raised: 0, remaining: 0 };

  const totalNeeded = products.reduce(
    (sum, product) => sum + product.amount,
    0,
  );
  const totalRaised = products.reduce((sum, product) => {
    const productInvestments =
      product.investments?.reduce((invSum, inv) => invSum + inv.amount, 0) ?? 0;
    return sum + productInvestments;
  }, 0);

  return {
    percent: totalNeeded > 0 ? (totalRaised / totalNeeded) * 100 : 0,
    raised: totalRaised,
    remaining: totalNeeded - totalRaised,
  };
};

interface ProductCardProps {
  product: Products;
  currency: string;
}

const ProductCard = ({ product, currency }: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalInvested =
    product.investments?.reduce((sum, inv) => sum + inv.amount, 0) ?? 0;
  const progress =
    product.amount > 0 ? (totalInvested / product.amount) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-sm font-medium">
            {totalInvested} / {product.amount}
          </span>
        </div>

        <p className="text-muted-foreground mb-3 text-sm">
          {product.description}
        </p>

        <div className="mb-3">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex w-full justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>View {product.investments?.length || 0} Investments</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {isExpanded && product.investments?.length > 0 && (
        <div className="mt-2 border-t px-4 pt-1 pb-4">
          <ul className="space-y-3">
            {product.investments.map((investment) => (
              <li
                key={investment.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <UserAvatar image={investment.user.avatarLink} />
                  <div>
                    <p className="font-medium">
                      {getUserName(
                        investment.user.name,
                        investment.user.firstName,
                        investment.user.lastName,
                      )}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(investment.createdAt)}
                    </p>
                  </div>
                </div>
                <span className="font-medium">Amount: {investment.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface ProjectPageProps {
  id: string;
}

const ProjectPage = ({ id }: ProjectPageProps) => {
  const { project, isLoading } = useProjectQuery(id);
  const { user } = useAuthStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [investAmount, setInvestAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  if (!project.products) return null;

  const { percent, raised, remaining } = calculateProgress(project.products);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full pb-12">
      {/* Project Header */}
      <div className="bg-primary/5 w-full px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{project.address}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created on {formatDate(project.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6 md:px-6">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left Column - Project Details */}
          <div>
            {/* Project Images */}
            <div className="mb-8">
              <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={
                    project.photos?.at(activeImageIndex)?.link ??
                    "/api/placeholder/900/500"
                  }
                  alt="Project Image"
                  fill
                  className="object-cover"
                />
              </div>

              {project?.photos && (
                <div className="flex gap-2 overflow-x-auto">
                  {project.photos?.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`relative h-20 w-32 cursor-pointer overflow-hidden rounded-md border-2 ${
                        index === activeImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={photo.link}
                        alt={`${project.name} photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-6 grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="products">Products Needed</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="mb-3 text-xl font-semibold">
                    About This Project
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold">Timeline</h2>
                  <p className="text-muted-foreground">
                    {project.additionalInfo?.timeline}
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold">Impact</h2>
                  <p className="text-muted-foreground">
                    {project.additionalInfo?.impact}
                  </p>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-4">
                <h2 className="mb-3 text-xl font-semibold">Products Needed</h2>
                {project.products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={project.currencyType ?? "UAH"}
                  />
                ))}
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-4">
                <h2 className="mb-3 text-xl font-semibold">Project Team</h2>
                <div className="space-y-4">
                  {project.additionalInfo?.team.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <Avatar className="h-10 w-10">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={40}
                          height={40}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold">Created By</h3>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Avatar className="h-10 w-10">
                      <Image
                        src={project.createdBy.avatar}
                        alt={project.createdBy.name}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.createdBy.name}</p>
                      <p className="text-muted-foreground text-sm">
                        Project Owner
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Investment Box */}
          <div className="space-y-6">
            {/* Funding Progress Card */}
            <div className="bg-card sticky top-20 rounded-lg border p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Project Funding</h2>

              <div className="mb-6 space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Funding Progress
                    </span>
                    <span className="font-medium">{percent.toFixed(0)}%</span>
                  </div>
                  <Progress value={percent} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <p className="text-muted-foreground text-sm">Raised</p>
                    <p className="text-lg font-semibold">{raised}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <p className="text-muted-foreground text-sm">Remaining</p>
                    <p className="text-lg font-semibold">{remaining}</p>
                  </div>
                </div>
              </div>
              {user?.id === project.userId && (
                <CreateInvestmentModal products={project.products ?? []} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
