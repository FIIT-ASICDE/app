"use client";

import { onboardSchema } from "@/lib/schemas/user-schemas";
import { api } from "@/lib/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Save, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

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

    const completeOnboardingMutation = api.user.completeOnboarding.useMutation({
        onSuccess: () => {
            toast.success("Onboarding successful", {
                description: "Welcome!"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    async function onSubmit(data: z.infer<typeof onboardSchema>) {
        const onboarded = await completeOnboardingMutation.mutateAsync(data);
        router.replace("/" + onboarded.username);
        router.refresh();
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
                                    <FormLabel className="text-muted-foreground">
                                        First name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="* John"
                                                className="pl-9"
                                                autoComplete="given-name"
                                                {...field}
                                            />
                                        </div>
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
                                    <FormLabel className="text-muted-foreground">
                                        Last name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="* Doe"
                                                className="pl-9"
                                                autoComplete="family-name"
                                                {...field}
                                            />
                                        </div>
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
                                <FormLabel className="text-muted-foreground">
                                    Bio
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself (optional)"
                                            className="resize-none pl-9 pt-2"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full hover:bg-primary-button-hover"
                        disabled={
                            completeOnboardingMutation.isPending ||
                            !form.formState.isDirty
                        }
                    >
                        {completeOnboardingMutation.isPending ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save />
                                Complete account
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </fieldset>
    );
}
