"use client"

import React from 'react'


type Task = {
    id: string;
    title: string;
    responsavel: string;
    status: string;
}

type CompleteProps = {
  dados: Task[];
};


export default function Complete({ dados }: CompleteProps) {
  const aComplete = dados.filter((task: Task) => task.status === "Completa");
  return (
        <div className="flex-1 min-w-[300px] max-w-full md:max-w-[calc(50%-10px)] rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03]">
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <h1 className="text-base font-medium text-gray-800">Concluído</h1>
            </div>
            <div className="border-t border-gray-100 p-5 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-white/[0.03]">
                <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left sm:px-6">
                        <p className="font-medium text-gray-500 text-theme-xs whitespace-nowrap dark:text-gray-400">Tarefa</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                        <p className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Responsável</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                        <p className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {aComplete.map((task: Task) => (
                    <tr key={task.id} className="border-b border-gray-100">
                        <td className="px-5 py-3 text-left sm:px-6">
                        <p className="font-normal text-black text-theme-xs">{task.title}</p>
                        </td>
                        <td className="px-5 py-3 text-left sm:px-6">
                        <p className="font-normal text-black text-theme-xs">{task.responsavel}</p>
                        </td>
                        <td className="px-5 py-3 text-left sm:px-6">
                        <button className="text-blue-500 hover:underline">Concluir</button>
                        </td>
                    </tr>
                    ))}
                    {aComplete.length === 0 && (
                    <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-500">
                        Nenhuma tarefa completada.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>

)
}
