'use server'

import { signIn, signOut } from "@/auth";

export interface LoginResponse {
    error?: string;  // campo 'error' opzionale
    // aggiungi altri campi che ti aspetti nella risposta, se necessario
}

export async function doSocialLogin(provider: string) {
    await signIn(provider, { redirectTo: "/admin/dashboard" });
}

export async function doLogout() {
    // cancellare i dati
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<LoginResponse> {
    console.log(formData);

    try {
        const response = await signIn("credentials", {
            email: formData.get('email') as string, // Assicurati che sia una stringa
            password: formData.get('password') as string, // Assicurati che sia una stringa
            redirect: false,
        });

        console.log(response);

        // Se la risposta è positiva, restituisci un oggetto di risposta vuoto o con i dati necessari
        if (response?.error) {
            return { error: response.error }; // Restituisce l'errore se presente
        }

        return {}; // Restituisce un oggetto vuoto in caso di successo
    } catch (error: any) { // Aggiungi 'any' per il tipo di errore
        console.error(error.message);
        return { error: "An unexpected error occurred." }; // Restituisce un messaggio di errore
    }
}
