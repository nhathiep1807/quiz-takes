"use client";
import CloseIcon from "@components/app/icons/close-icon";
import classcat from "classcat";

type BaseDialogProps = {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  closeIcon?: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BaseDialog({
  open,
  children,
  className,
  closeIcon = true,
  onOpenChange,
}: BaseDialogProps) {
  return (
    open && (
      <div
        className={classcat([
          "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md",
        ])}
        onClick={() => onOpenChange(false)}
      >
        <div
          className={classcat([
            "relative p-10 border-[#95959599] rounded-xl text-black bg-white w-[771px]",
            className,
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {closeIcon && (
            <CloseIcon
              className="cursor-pointer absolute top-10 right-10"
              onClick={() => onOpenChange(false)}
            />
          )}
        </div>
      </div>
    )
  );
}
