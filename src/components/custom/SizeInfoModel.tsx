import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const SizeInfoDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ÁO FORM SUÔNG, ÁP DỤNG CHO CẢ NAM VÀ NỮ</DialogTitle>
        </DialogHeader>

        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Size
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Chiều Cao (Cm)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                Cân Nặng (Kg)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "S", height: "150-155", weight: "51-55" },
              { size: "M", height: "166-170", weight: "56-60" },
              { size: "L", height: "171-175", weight: "61-66" },
              { size: "XL", height: "176-180", weight: "67-72" },
              { size: "XXL", height: "181-184", weight: "73-83" },
              { size: "XXXL", height: "185-189", weight: "83-93" },
            ].map((row) => (
              <tr key={row.size}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {row.size}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {row.height}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {row.weight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SizeInfoDialog;
