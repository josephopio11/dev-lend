"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientAdmin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserFormData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export function AddUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    name: "",
    role: "user",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const { data: newUser, error } = await clientAdmin.createUser({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role as "user" | "admin",
    });

    const submittedData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role,
    };

    console.log("User data submitted:", newUser);

    if (error?.message) {
      toast.error(error.message);
    }

    setFormData({
      email: "",
      password: "",
      name: "",
      role: "user",
    });
    setSubmitSuccess(true);
    setIsSubmitting(false);
    router.push("/admin/users");
  };

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
        <CardDescription>
          Fill out the form below to create a new user account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                aria-invalid={!!errors.password}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="James Smith"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  {/* <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem> */}
                </SelectContent>
              </Select>
              <FieldDescription>
                Determines the user&apos;s permissions.
              </FieldDescription>
            </Field>

            {/* <Field data-invalid={!!errors.data}>
              <FieldLabel htmlFor="data">Custom Data (JSON)</FieldLabel>
              <Textarea
                id="data"
                placeholder='{ "customField": "customValue" }'
                value={formData.data}
                onChange={(e) => handleChange("data", e.target.value)}
                rows={4}
                className="font-mono text-sm"
                aria-invalid={!!errors.data}
              />
              <FieldDescription>
                Optional JSON object for custom user data.
              </FieldDescription>
              {errors.data && <FieldError>{errors.data}</FieldError>}
            </Field> */}

            {submitSuccess && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                User created successfully!
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating User..." : "Create User"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </>
  );
}
