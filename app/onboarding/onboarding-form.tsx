"use client";

import { onboardSchema } from "@/lib/schemas/user-schemas";
import { api } from "@/lib/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export function OnboardingForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof onboardSchema>>({
        resolver: zodResolver(onboardSchema),
        defaultValues: {
            name: "",
            surname: "",
            bio: "",
        },
    });

    const completeOnboardingMutation =
        api.user.completeOnboarding.useMutation();
    async function onSubmit(data: z.infer<typeof onboardSchema>) {
        const onboarded = await completeOnboardingMutation.mutateAsync(data);
        router.replace("/" + onboarded.username);
    }

    return (
        <fieldset disabled={completeOnboardingMutation.isPending}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Optional: Share a brief description about
                                    yourself
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={completeOnboardingMutation.isPending}
                    >
                        {completeOnboardingMutation.isPending
                            ? "Saving..."
                            : "Complete Profile"}
                    </Button>
                </form>
            </Form>
        </fieldset>
    );
}
