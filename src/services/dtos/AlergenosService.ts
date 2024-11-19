import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { BackendClient } from "../BackendClient";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";
import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
export class AlergenosService extends BackendClient<IAlergenos> {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAllAlergenos() {
        return await this.getAll();
    }

    async deleteAlergeno(id: number) {
        return await this.delete(id);
    }
    async updateAlergeno(id: number, data: IUpdateAlergeno): Promise<IAlergenos> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al actualizar el alérgeno:", errorData);
                throw new Error(`Error al actualizar el alérgeno: ${response.statusText}`);
            }

            const updatedAlergeno = await response.json();
            return updatedAlergeno as IAlergenos;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    async createAlergeno(alergeno: ICreateAlergeno) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alergeno),
        });
        return await response.json();
    }
} 