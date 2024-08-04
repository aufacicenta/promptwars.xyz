"use client";

import clsx from "clsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { NavbarProps } from "./Navbar.types";
import { CreditsBalance } from "../promptwars/credits-balance/CreditsBalance";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthorizationContext } from "@/context/authorization/useAuthorizationContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CircleUser } from "lucide-react";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { signUpForm, signUp, currentUser, actions } = useAuthorizationContext();

  return (
    <header
      className={clsx(
        className,
        "fixed top-0 z-30 flex h-14 w-screen items-center justify-end gap-4 border-b bg-background px-4 py-3 sm:h-auto sm:border-0 sm:px-6",
      )}
    >
      <CreditsBalance />

      {currentUser?.id && (
        <Button variant="outline">
          <CircleUser className="mr-2" /> Account
        </Button>
      )}

      <Dialog>
        <DialogTrigger asChild>{!currentUser && <Button className="mr-2">Sign Up</Button>}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>Create an account to play and get 3 free credits</DialogDescription>
          </DialogHeader>

          <div className="mb-4 flex w-full items-center space-x-2">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(signUp)} className="w-full space-y-6">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={actions.signUp.isLoading}>
                  {actions.signUp.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
