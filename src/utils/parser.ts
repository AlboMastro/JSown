export function generateMarkdown(input: string): { output: string; error: string | null } {
    if (!input.trim()) {
        return { output: '', error: null };
    }

    return {
        output : "Dummy Output",
        error: null
    }
}