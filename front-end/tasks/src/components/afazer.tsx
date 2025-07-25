"use client";

import React, { useState } from 'react';
import { handleCompleteTask } from "@/lib/form";

type Task = {
  id: string;
  title: string;
  responsavel: string;
  status: string;
};

type AfazerProps = {
  onReturn: () => void;
  dados: Task[];
};

export default function Afazer({ onReturn, dados }: AfazerProps) {
  const aFazer = dados.filter((task: Task) => task.status === "A Fazer");
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);

  const handleSubmit = async (e:  React.MouseEvent<HTMLButtonElement>, taskId: string) => {
    e.preventDefault();
    setLoadingTaskId(taskId);
    try {
      await handleCompleteTask(taskId);
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
    } finally {
        onReturn();
      setTimeout(() => {
        setLoadingTaskId(null);
      }, 2000); // opcional: pode ser removido se não quiser delay
    }
  };

  return (
    <div className="flex-1 min-w-[300px] max-w-full md:max-w-[calc(50%-10px)] rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03]">
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <h1 className="text-base font-medium text-gray-800">A Fazer</h1>
      </div>
      <div className="border-t border-gray-100 p-5 sm:p-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-white/[0.03]">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-3 text-left sm:px-6">
                    <p className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tarefa</p>
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6">
                    <p className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Responsável</p>
                  </th>
                  <th className="px-5 py-3 text-left sm:px-6">
                    <p className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Ação</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {aFazer.map((task: Task) => (
                  <tr key={task.id} className="border-b border-gray-100">
                    <td className="px-5 py-3 text-left sm:px-6">
                      <p className="font-normal text-black text-theme-xs">{task.title}</p>
                    </td>
                    <td className="px-5 py-3 text-left sm:px-6">
                      <p className="font-normal text-black text-theme-xs">{task.responsavel}</p>
                    </td>
                    <td className="px-5 py-3 text-left sm:px-6">
                      <button
                        className="text-orange-500 border border-1 px-2 py-1 rounded-md border-orange-500 hover:cursor-pointer hover:bg-orange-500 hover:text-white flex items-center gap-2"
                        onClick={(e) => handleSubmit(e, task.id)}
                        disabled={loadingTaskId === task.id}
                      >
                        {loadingTaskId === task.id ? 'Loading...' : 'Concluir'}
                      </button>
                    </td>
                  </tr>
                ))}
                {aFazer.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      Nenhuma tarefa pendente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
