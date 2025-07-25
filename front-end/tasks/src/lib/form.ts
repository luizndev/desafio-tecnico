
import api from "@/services/api";
import Cookies from "js-cookie";
import { useRef } from "react";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    try {
        const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password
        });

        if (response.status === 200) {
            const { token, user } = response.data;
            Cookies.set("auth_token", token, { expires: 1 }); // expira em 1 dia
            Cookies.set("auth_id", response.data.user.id, { expires: 1 }); // expira em 1 dia
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
        }

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
}



export async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    if (!name || !email || !password) {
        console.error("Preencha todos os campos");
        return;
    }
    try {
        const response = await api.post('/auth/register', {
            name: name,
            email: email,
            password: password
        }).then((response) => {
            if (response.status === 201) {
                window.location.href = "/login";
            }
        }
        );
    } catch (error) {
        console.error("Registration failed:", error);
    }
    
}


export async function handleCreateNewTask(task: string) {
    const id = Cookies.get("auth_id");
    const token = Cookies.get("auth_token");
    try{
        const response = await api.post('/tasks', {
        title: task,
        ownerID: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
            console.log(response)
        }
        );
    } catch (error) {
        console.error("Registration failed:", error);
    }
}


export async function handleCompleteTask(taskId: string) {
  const token = Cookies.get("auth_token");

  try {
    const response = await api.patch(
      `/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.error("Erro ao completar a tarefa:", error);
  }
}
