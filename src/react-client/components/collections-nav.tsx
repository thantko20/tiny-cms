import { Link } from "@tanstack/react-router";
import { cn } from "../lib/utils/cn";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { Plus } from "lucide-react";
import {
  AddCollectionDto,
  addCollectionSchema
} from "../../validations/collections";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import pluralize from "pluralize";

const AddCollectionDialog = ({ className }: { className?: string }) => {
  const form = useForm<AddCollectionDto>({
    resolver: zodResolver(addCollectionSchema),
    defaultValues: {
      displayName: ""
    }
  });

  function onSubmit(values: AddCollectionDto) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("gap-2", className)} variant="default">
          <Plus size={20} /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new collection</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Blogs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <FormItem>
                <FormLabel>API Name</FormLabel>
                <FormControl>
                  <Input
                    value={form.watch("displayName")?.toLowerCase() || ""}
                    readOnly
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>API Name (Plural)</FormLabel>
                <FormControl>
                  <Input
                    value={
                      pluralize(form.watch("displayName").toLowerCase()) || ""
                    }
                    readOnly
                  />
                </FormControl>
              </FormItem>
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  links: {
    to: string;
    title: string;
  }[];
};

export const CollectionsNav = ({ links }: Props) => {
  return (
    <div className="py-4">
      <h2 className="px-4 text-xl font-bold">Collections</h2>
      <div className="flex flex-col gap-2 px-4 mt-6">
        {links.map((link) => (
          <Link
            key={link.title}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start font-medium"
            )}
            to={link.to}
          >
            {link.title}
          </Link>
        ))}
        <AddCollectionDialog className="w-full mt-6" />
      </div>
    </div>
  );
};
