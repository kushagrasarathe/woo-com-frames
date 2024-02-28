"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ArrowLeft, ChevronRight, HelpCircleIcon } from "lucide-react";
import helpExample from "@/assets/api-example.jpeg";
import Image from "next/image";

export default function AddStore() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Your Store</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Keys</DialogTitle>
            <DialogDescription>
              Enter your {`store's`} API Key and Secret to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <div className=" flex items-center justify-between">
              <Label htmlFor="key">Key:</Label>
              <Input id="key" placeholder="Your API Key" className="w-9/12" />
            </div>
            <div className=" flex items-center justify-between">
              <Label htmlFor="secret">Secret:</Label>
              <Input
                id="secret"
                type="text"
                placeholder="Your API Secret"
                className="w-9/12"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <HelpDialog />
            <Button>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function HelpDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1 text-sm">
          <HelpCircleIcon className=" h-4 w-4" />
          <span>Help</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Help</AlertDialogTitle>
          <AlertDialogDescription>
            To get started, {`you'll`} need to get an API Key and Secret from
            your Woocommerce Dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-start gap-1 text-sm">
          Woocommerce <ChevronRight className="w-4 h-4" /> Settings{" "}
          <ChevronRight className="w-4 h-4" /> Advanced{" "}
          <ChevronRight className="w-4 h-4" /> Rest APIs
        </div>
        <div>
          <Image src={helpExample} alt="API Example" />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
