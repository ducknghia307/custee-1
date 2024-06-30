import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-40"></div>

      <div className="sm:max-w-lg w-full m-3 sm:mx-auto bg-white border shadow-sm rounded-xl relative">
        <div className="flex flex-col">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 className="font-bold text-gray-800">Confirmation</h3>
            <button
              type="button"
              className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="mt-1 text-gray-800">
              Are you sure you want to add this item to your cart?
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
              onClick={onConfirm}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
