//Main Page
"use client";

import { useCodingLogs } from "@/app/hooks/useCodingLogs";
import { useState } from "react";
import { CodingLog } from "@/types/codingLog";

export default function HomePage() {
  const { logs, isLoading, addLog, updateLog, deleteLog } = useCodingLogs();

  const [isAddMode, setIsAddMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateLog(editingId, formData);
      setEditingId(null);
    } else {
      addLog(formData);
      setIsAddMode(false);
    }
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (log: CodingLog) => {
    setEditingId(log.id);
    setFormData({
      title: log.title,
      content: log.content,
      date: log.date,
    });
    setIsAddMode(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLog(id);
    }
  };

  const handleCancel = () => {
    setIsAddMode(false);
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (isLoading) return <div> 로딩중 ... </div>;

  return (
    <main className="p-10">
      <h1 className="text-20px font-bold mb-5">📘5분 기록 보드</h1>

      <div className="mb-5">
        <button
          onClick={() => setIsAddMode(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isAddMode}
        >
          새 로그 추가
        </button>
      </div>

      {isAddMode && (
        <div className="mb-6 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
          <h2 className="text-lg font-semibold mb-3">
            {editingId ? "로그 수정" : "새 로그 작성"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">내용</label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border rounded h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">날짜</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {editingId ? "수정" : "추가"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <ul className="space-y-3">
        {logs?.map((log: CodingLog) => (
          <li key={log.id} className="p-4 border rounded shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold">{log.title}</p>
                <p>{log.content}</p>
                <p className="text-sm text-gray-700">{log.date}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(log)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  disabled={isAddMode}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  disabled={isAddMode}
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {logs?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          아직 작성된 로그가 없습니다. 첫 번째 로그를 작성해보세요!
        </div>
      )}
    </main>
  );
}
