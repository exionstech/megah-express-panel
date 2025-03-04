"use client"
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FiAlertCircle } from "react-icons/fi";

const KycModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-blue-20 text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-indigo-600 w-16 h-16 mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-semibold tracking-wide text-center mb-2">
                Verify KYC Details
              </h3>
              <p className="text-center mb-6">
                Complete your kyc verification process.After verification you
                can apply for creating new{" "}
                Megha Express HUB account.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    router.push('/')
                  }}
                  className="bg-transparent border hover:bg-black/20  transition-colors text-black font-medium w-full py-2 rounded-lg"
                >
                  Nah, go back
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-indigo-600 hover:opacity-90 hover:bg-brand-500 transition-opacity text-white font-medium w-full py-2 rounded-lg"
                >
                  Understood!
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KycModal;
