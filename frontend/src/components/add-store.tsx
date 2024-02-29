"use client";

import React, { useEffect, useState } from "react";
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
import {
  ArrowLeft,
  ChevronRight,
  EyeIcon,
  EyeOffIcon,
  HelpCircleIcon,
} from "lucide-react";
import helpExample from "@/assets/api-example.jpeg";
import Image from "next/image";
import { getCredentialsLocal, storeCredentialsLocal } from "@/utils/apiMethods";

export default function AddStore() {
  const [hasStoredKeys, setHasStoredKeys] = useState<boolean>(false);
  const [storedKeys, setStoredKeys] = useState<{
    consumerKey: string;
    consumerSecret: string;
  } | null>(null);
  const [keysToStore, setKeysToStore] = useState<{
    consumerKey: string | undefined;
    consumerSecret: string | undefined;
  }>();

  const [showAPI, setShowAPI] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const handleToggleAPI = () => {
    setShowAPI(!showAPI);
  };

  const handleToggleSecret = () => {
    setShowSecret(!showSecret);
  };

  const checkStoredKeys = async () => {
    try {
      const keys = await getCredentialsLocal();
      if (keys?.consumerKey && keys?.consumerSecret) {
        setHasStoredKeys(true);
        setStoredKeys(keys);
      }
    } catch (error) {
      setHasStoredKeys(false);
      console.log(error);
    }
  };

  const storeKeys = async () => {
    try {
      if (keysToStore?.consumerKey && keysToStore?.consumerSecret) {
        await storeCredentialsLocal(
          keysToStore.consumerKey,
          keysToStore.consumerSecret
        );
        await checkStoredKeys();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasStoredKeys) {
      checkStoredKeys();
    }
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{hasStoredKeys ? "Check Keys" : "Add Store Keys"}</Button>
        </DialogTrigger>

        {hasStoredKeys && storedKeys ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your keys</DialogTitle>
              <DialogDescription>
                These are the {`store's`} API Key and Secret
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <div className=" flex items-center justify-between">
                <Label htmlFor="key">Key:</Label>
                {/* <Input id="key" placeholder="Your API Key" className="w-9/12" /> */}
                <p>{storedKeys.consumerKey}</p>
              </div>
              <div className=" flex items-center justify-between">
                <Label htmlFor="secret">Secret:</Label>
                {/* <Input
                  id="secret"
                  type="text"
                  placeholder="Your API Secret"
                  className="w-9/12"
                /> */}
                <p>{storedKeys.consumerSecret}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <HelpDialog />
              <Button
                onClick={() => {
                  setHasStoredKeys(false);
                  setStoredKeys(null);
                }}
              >
                Edit
              </Button>
            </div>
          </DialogContent>
        ) : (
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
                <Input
                  id="key"
                  placeholder="Your API Key"
                  className="w-9/12"
                  onChange={(e) =>
                    setKeysToStore({
                      consumerKey: e.target.value,
                      consumerSecret: keysToStore?.consumerSecret,
                    })
                  }
                />
              </div>
              <div className=" flex items-center justify-between">
                <Label htmlFor="secret">Secret:</Label>
                <div className=" relative w-9/12">
                  <Input
                    id="secret"
                    type={showSecret ? "text" : "password"}
                    placeholder="Your API Secret"
                    onChange={(e) =>
                      setKeysToStore({
                        consumerKey: keysToStore?.consumerKey,
                        consumerSecret: e.target.value,
                      })
                    }
                  />
                  <div
                    onClick={handleToggleSecret}
                    className=" absolute top-3 right-3 cursor-pointer"
                  >
                    {showSecret ? (
                      <EyeOffIcon className=" h-4 w-4" />
                    ) : (
                      <EyeIcon className=" h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <HelpDialog />
              <Button onClick={() => storeKeys()}>Save</Button>
            </div>
          </DialogContent>
        )}
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
