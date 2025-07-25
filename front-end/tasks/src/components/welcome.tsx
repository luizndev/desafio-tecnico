'use client'

import { useEffect, useState } from "react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { handleCreateNewTask } from '@/lib/form'
import { Button } from '@/components/ui/button';

type HomeProps = {
  onReturn: () => void;
};

export default function Home({ onReturn }: HomeProps) {
  const [name, setName] = useState("Visitante");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setName(parsedUser.name);
      } catch (err) {
        console.error("Erro ao parsear o usuário:", err);
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateNewTask(task);
    setTask("")
    onReturn();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Olá, {name}</h1>
        <span className="mt-1 text-theme-sm text-gray-500 dark:text-gray-500">
          Gerencie suas tarefas de forma colaborativa
        </span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex items-end gap-2">
        <div>
          <Label htmlFor="task" className="mt-4">Nova Tarefa</Label>
          <Input
            id="task"
            type="text"
            placeholder="Digite a tarefa"
            className="mt-2"
            value={task}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className='bg-[#FF8000] hover:bg-[rgb(255,160,36)] hover:cursor-pointer'
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
}
