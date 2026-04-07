"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Sign-in did not finish</CardTitle>
          <CardDescription>
            Something went wrong during Google sign-in. You can try again from
            the home page or log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link
            href="/"
            className={cn(buttonVariants(), "w-full justify-center")}
          >
            Back to home
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full justify-center"
            )}
          >
            Go to log in
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
