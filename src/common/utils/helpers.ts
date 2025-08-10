import { notifications } from "@mantine/notifications";


export const toast = ({ message, title }: { message: string, title?: string }) => {
    return {
        success: () => notifications.show({
            color: "green",
            title: title || 'Success',
            message,
            withBorder: true,
            // autoClose: 5000
        }),
        error: () => notifications.show({
            color: "red",
            title: title || 'Failed',
            message: message || "Something went wrong!",
            withBorder: true,
        })
    }
}


export const getApiErrorMessage = (e: any): string => {
    return (
        e?.response?.data?.message ||
        e?.message ||
        "Something went wrong, Please try again later!"
    );
};