"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";
import Afazer from "@/components/afazer";
import Complete from "@/components/complete";
import { getTasks } from "@/lib/get";
import Cookies from "js-cookie";
import { redirect, RedirectType } from 'next/navigation'


export type Task = {
  id: string;
  title: string;
  responsavel: string;
  status: string;
  ownerID: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(true)

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();

    const id = Cookies.get("auth_id");
    const token = Cookies.get("auth_token");

    if(!id && !token) {
      redirect('/login', RedirectType.push)
    }else{
      setOpen(false)
    }
  }, []);

  const refreshTasks = async () => {
    await fetchTasks();
  };

  return (
  <>
    {open ? (
      <div>
      </div>
    ) : (
      <div>
        <Navbar />
        <div className="px-7 md:px-20 flex flex-col h-screen py-4">
          <Welcome onReturn={refreshTasks} />
          <div className="flex flex-wrap w-full gap-5 justify-between py-5">
            <Afazer dados={tasks} onReturn={refreshTasks} />
            <Complete dados={tasks} />
          </div>
        </div>
      </div>
    )}
  </>
);

}
