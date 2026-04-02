"use client";

import {
  getBorrower,
  GetBorrowerType,
  updateBorrower,
} from "@/app/actions/borrower";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";

interface EditBorrowerModalProps {
  borrowerId: string;
  title: string;
}

const positions = [
  { label: "Student", value: "Student" },
  { label: "Teacher", value: "Teacher" },
  { label: "Head of Primary", value: "Head of Primary" },
  { label: "Head Of Secondary", value: "Head Of Secondary" },
  { label: "Finance Manager", value: "Finance Manager" },
  { label: "Homeroom Teacher", value: "Homeroom Teacher" },
  { label: "Teaching Assistant", value: "Teaching Assistant" },
  { label: "Foundation Stage Teacher", value: "Foundation Stage Teacher" },
  { label: "EAL Teacher", value: "EAL Teacher" },
  { label: "EAL Assistant", value: "EAL Assistant" },
  { label: "Inclusion Assistant", value: "Inclusion Assistant" },
  { label: "Receptionist", value: "Receptionist" },
  { label: "Admin Assistant", value: "Admin Assistant" },
  { label: "Head Of Department", value: "Head Of Department" },
  { label: "Head of Inclusion", value: "Head of Inclusion" },
  { label: "Deputy Head of Primary", value: "Deputy Head of Primary" },
  { label: "Deputy Head of Secondary", value: "Deputy Head of Secondary" },
  { label: "Head of Whole School EAL", value: "Head of Whole School EAL" },
  {
    label: "Whole School Assistant Head",
    value: "Whole School Assistant Head",
  },
  { label: "Executive Principal", value: "Executive Principal" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(70),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  position: z.string().min(1, "Please select a position"),
});

const EditBorrowerModal = ({ borrowerId, title }: EditBorrowerModalProps) => {
  const [open, setOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [borrower, setBorrower] = useState<GetBorrowerType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      position: "",
    },
  });

  const selectedPosition = form.watch("position");

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // console.log(values);
      const res = updateBorrower(
        borrower?.id || "",
        values.name,
        values.email,
        values.position,
        values.phone,
        values.address,
      );

      // console.log(res);
      toast.success("Borrower updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to update borrower. Please try again.");
    }
  }

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setIsLoading(true);

    const fetchBorrower = async () => {
      const data = await getBorrower(borrowerId);
      if (!cancelled && data) {
        setBorrower(data);
        form.reset({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          position: data.position || "",
        });
      }
      setIsLoading(false);
    };

    fetchBorrower();

    return () => {
      cancelled = true;
    };
  }, [borrowerId, open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-start hover:underline underline-offset-2 transition-colors">
        <span className="font-semibold text-lg text-foreground leading-tight">
          {title}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-2xl rounded-xl max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
              <User className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                Edit Borrower
              </DialogTitle>
              {borrower && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  Updating details for{" "}
                  <span className="text-foreground font-medium">
                    {borrower.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner className="size-6 text-primary" />
            </div>
          ) : (
            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      className="h-11"
                      {...form.register("name")}
                    />
                    <FieldError>
                      {form.formState.errors.name?.message}
                    </FieldError>
                  </Field>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="h-11"
                        {...form.register("email")}
                      />
                      <FieldError>
                        {form.formState.errors.email?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+60 12-345 6789"
                        className="h-11"
                        {...form.register("phone")}
                      />
                      <FieldError>
                        {form.formState.errors.phone?.message}
                      </FieldError>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="position">Position</FieldLabel>
                    <Popover open={positionOpen} onOpenChange={setPositionOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={positionOpen}
                          className="w-full h-11 justify-between font-normal"
                        >
                          {selectedPosition
                            ? positions.find(
                                (p) => p.value === selectedPosition,
                              )?.label
                            : "Search and select a position..."}
                          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-(--radix-popover-trigger-width) p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search positions..." />
                          <CommandList>
                            <CommandEmpty>No position found.</CommandEmpty>
                            <CommandGroup>
                              {positions.map((position) => (
                                <CommandItem
                                  key={position.value}
                                  value={position.value}
                                  onSelect={(value) => {
                                    form.setValue("position", value, {
                                      shouldValidate: true,
                                    });
                                    setPositionOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 size-4",
                                      selectedPosition === position.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {position.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FieldDescription>
                      Select the borrower&apos;s role in the organization
                    </FieldDescription>
                    <FieldError>
                      {form.formState.errors.position?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Textarea
                      id="address"
                      placeholder="Enter full address"
                      className="min-h-24 resize-none"
                      {...form.register("address")}
                    />
                    <FieldError>
                      {form.formState.errors.address?.message}
                    </FieldError>
                  </Field>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditBorrowerModal;
