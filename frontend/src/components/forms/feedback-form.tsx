"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { useAuthStore } from "@/store/authStore";

const feedbackTypes = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "content", label: "Content Feedback" },
  { value: "usability", label: "Usability Feedback" },
  { value: "other", label: "Other" },
] as const;

const ratingOptions = [
  { value: "1", label: "Very Poor" },
  { value: "2", label: "Poor" },
  { value: "3", label: "Average" },
  { value: "4", label: "Good" },
  { value: "5", label: "Excellent" },
] as const;

const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "content", "usability", "other"], {
    required_error: "Please select a feedback type.",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please provide a rating.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmitSuccess,
}) => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: "feature",
      title: "",
      description: "",
      rating: "5",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsLoading(true);

    try {
      // API call to submit feedback
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user ? { Authorization: `Bearer ${useAuthStore.getState().token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We value your input.",
      });

      setSubmitted(true);
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4 p-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/20 p-3">
            <Icons.check className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Thanks for your feedback!</h2>
        <p className="text-muted-foreground">
          We appreciate your input and will use it to improve MindaGrow.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          Submit another feedback
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the category that best describes your feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief summary of your feedback"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A concise title for your feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide detailed information..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please be as specific as possible. Include steps to reproduce if
                  reporting a bug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Overall Rating</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1"
                  >
                    {ratingOptions.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-col items-center space-y-1"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={option.value}
                            className="sr-only"
                            id={`rating-${option.value}`}
                          />
                        </FormControl>
                        <label
                          htmlFor={`rating-${option.value}`}
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm cursor-pointer ${
                            field.value === option.value
                              ? "bg-primary text-primary-foreground font-bold"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {option.value}
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {option.label}
                        </span>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!user && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll only use this to follow up on your feedback if necessary.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit Feedback
        </Button>
      </form>
    </Form>
  );
};