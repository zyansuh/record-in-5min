//코딩 일지 아이템 컴포넌트
"use client";

import { CodingLog } from "@/types/codingLog";

interface CodingLogItemProps {
  log: CodingLog;
  onEdit: (log: CodingLog) => void;
  onDelete: (id: number) => void;
  disabled?: boolean;
}

export default function CodingLogItem({
  log,
  onEdit,
  onDelete,
  disabled = false,
}: CodingLogItemProps) {
  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      onDelete(log.id);
    }
  };

  return (
    <li className="p-4 border rounded shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold text-lg mb-2">{log.title}</p>
          <p className="text-gray-800 mb-2">{log.content}</p>
          <p className="text-sm text-gray-500">📅 {log.date}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(log)}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
          >
            ✏️ 수정
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
          >
            🗑️ 삭제
          </button>
        </div>
      </div>
    </li>
  );
}
