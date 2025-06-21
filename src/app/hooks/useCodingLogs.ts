// 코딩 로그 관리를 위한 커스텀 훅
"use client";

import { useState, useEffect } from "react";
import { CodingLog } from "@/types/codingLog";

export function useCodingLogs() {
  const [logs, setLogs] = useState<CodingLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로그 데이터 가져오기 (READ)
  useEffect(() => {
    // 실제로는 API 호출, 여기서는 로컬 데이터 시뮬레이션
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        // JSON 파일에서 데이터 로드 시뮬레이션
        const mockData: CodingLog[] = [
          {
            id: 1,
            title: "첫 번째 코딩 세션",
            content:
              "React 기초 학습을 시작했습니다. 컴포넌트 생성과 props 전달에 대해 배웠습니다.",
            date: "2024-01-15",
          },
          {
            id: 2,
            title: "useState 훅 학습",
            content:
              "상태 관리를 위한 useState 훅을 사용해 카운터 앱을 만들어봤습니다.",
            date: "2024-01-16",
          },
          {
            id: 3,
            title: "CSS 스타일링",
            content:
              "Tailwind CSS를 사용해서 컴포넌트에 스타일을 적용하는 방법을 익혔습니다.",
            date: "2024-01-17",
          },
        ];

        setTimeout(() => {
          setLogs(mockData);
          setIsLoading(false);
        }, 500); // 로딩 시뮬레이션
      } catch (error) {
        console.error("로그 데이터 로드 실패:", error);
        setIsLoading(false);
      }
    };

    loadLogs();
  }, []);

  // 새 로그 추가 (CREATE)
  const addLog = (newLog: Omit<CodingLog, "id">) => {
    const id = Math.max(...logs.map((log) => log.id), 0) + 1;
    const logWithId = { ...newLog, id };
    setLogs((prevLogs) => [...prevLogs, logWithId]);
    console.log("새 로그 추가됨:", logWithId);
  };

  // 로그 수정 (UPDATE)
  const updateLog = (
    id: number,
    updatedLog: Partial<Omit<CodingLog, "id">>
  ) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) => (log.id === id ? { ...log, ...updatedLog } : log))
    );
    console.log("로그 업데이트됨:", id, updatedLog);
  };

  // 로그 삭제 (DELETE)
  const deleteLog = (id: number) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
    console.log("로그 삭제됨:", id);
  };

  return {
    logs,
    isLoading,
    addLog,
    updateLog,
    deleteLog,
  };
}
