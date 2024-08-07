import { AccountDropdownMenuProps } from "./AccountDropdownMenu.types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { useAuthorizationContext } from "@/context/authorization/useAuthorizationContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export const AccountDropdownMenu: React.FC<AccountDropdownMenuProps> = () => {
  const {
    signUpForm,
    signUp,
    signIn,
    signInForm,
    signOut,
    currentUser,
    actions,
    isSignUpDialogOpen,
    setSignUpDialogOpen,
    isSignInDialogOpen,
    setSignInDialogOpen,
  } = useAuthorizationContext();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <CircleUser className={clsx("mr-2", { "stroke-green-500": !!currentUser })} /> Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                if (currentUser) return;

                setSignUpDialogOpen(true);
              }}
              disabled={!!currentUser}
            >
              Sign Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (currentUser) return;

                setSignInDialogOpen(true);
              }}
              disabled={!!currentUser}
            >
              Sign In
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Credits</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!currentUser}
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isSignInDialogOpen} onOpenChange={setSignInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Welcome back! Get the credits flowing (on your favor)!</DialogDescription>
          </DialogHeader>

          <div className="mb-4 flex w-full items-center space-x-2">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(signIn)} className="w-full space-y-6">
                <FormField
                  control={signInForm.control}
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
                  control={signInForm.control}
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

                <Button type="submit" disabled={actions.signIn.isLoading}>
                  {actions.signIn.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Sign In
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignUpDialogOpen} onOpenChange={setSignUpDialogOpen}>
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
    </>
  );
};
