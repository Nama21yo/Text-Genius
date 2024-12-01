import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUsage } from "@/context/usage";

export default function SignUpModal() {
  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-800">
            🚀 Unlock Unlimited AI-Powered Content!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-700 text-sm leading-relaxed">
          <div className="my-4 text-center">
            <p>
              🌟 Congratulations! You've generated <b>10,000 words</b> with our
              AI tool. That's an incredible achievement!
            </p>
            <p className="mt-4">
              Ready to take your content creation to the next level? Upgrade to
              a paid plan and enjoy:
            </p>
          </div>
          <ul className="list-disc list-inside space-y-2 mt-4 text-left">
            <li>
              ✨ <b>Unlimited word generation</b>
            </li>
            <li>🤖 Advanced AI features</li>
            <li>⚡ Faster processing times</li>
            <li>💬 Priority customer support</li>
          </ul>
          <div className="mt-6 text-center">
            <p>
              Don't let your creativity hit a wall. Upgrade now and keep the
              ideas flowing!
            </p>
            <Link href="/membership">
              <Button className="mt-4 w-full bg-primary text-white hover:bg-primary-dark">
                Join Membership
              </Button>
            </Link>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
