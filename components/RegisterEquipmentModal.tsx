"use client";

import { addEquipment } from "@/app/actions/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema, FormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterEquipmentModal = () => {
  const [open, setOpen] = useState(false);
  //   const createMutation = useCreateEquipment();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      serialNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await addEquipment(data.name, data.serialNumber, data.description);

      toast.success("Registered successfully", {
        description: JSON.stringify(data),
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95">
            <Plus className="h-4 w-4" />
            <span>Register Item</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Register Equipment
            </DialogTitle>
            <DialogDescription>
              Add a new piece of equipment to the inventory system.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. MacBook Pro M3"
                        className="rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. C02H... "
                        className="rounded-xl font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description / Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Specifications, accessories included..."
                        className="rounded-xl resize-none min-h-25"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl">
                  Register Item
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterEquipmentModal;
