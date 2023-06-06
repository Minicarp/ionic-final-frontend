import { Dialog } from '@capacitor/dialog';

const showPrompt = async ( message: string ) => {
    const { value } = await Dialog.prompt({
        message
    });
    return value
};

export function useDialog() {
    return {
        showPrompt
    }
}