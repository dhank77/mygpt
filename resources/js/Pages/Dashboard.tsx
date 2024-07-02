import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useState } from "react";
import ollama from "ollama";

export default function Dashboard({ auth }: PageProps) {
    const [chat, setChat] = useState("");
    const [newChat, setNewChat] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const chatGpt = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setChat(
            chat +
                "<br />" +
                '<div class="w-full flex justify-end"><div class="bg-gray-600 p-2 rounded-full ">' +
                newChat +
                "</div></div>"
        );
        await getChat(newChat);
        setNewChat("");
    };

    const getChat = async (chat: string) => {
        setIsLoading(true);
        const response = await ollama.chat({
            model: "phi3",
            messages: [{ role: "user", content: chat }],
        });
        console.log(response.message.content);
        
        setChat(chat + "<br />" +
                '<div class="w-full"><div class="bg-gray-300 p-2 rounded-full ">' +
                response.message.content +
                "</div></div>");
        setIsLoading(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="my-auto bg-white dark:bg-gray-900/50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-[#e5e7eb] min-w-2.5 h-[634px]">
                            <div className="flex flex-col space-y-1.5 pb-6">
                                <h2 className="font-semibold text-lg tracking-tight dark:text-white">
                                    Chatbot
                                </h2>
                                <p className="text-sm dark:text-white text-[#6b7280] leading-3">
                                    Powered by Dhank77 - Ollama
                                </p>
                            </div>
                            <div
                                className="pr-4 h-[474px]"
                                style={{ minWidth: "100%", display: "table" }}
                            >
                                <div className="flex gap-3 my-4 dark:text-white text-gray-600 text-sm flex-1">
                                    <div
                                        className="w-full"
                                        dangerouslySetInnerHTML={{
                                            __html: chat,
                                        }}
                                    />
                                </div>
                                {isLoading && (
                                    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                                        <svg
                                            className="text-gray-300 animate-spin"
                                            viewBox="0 0 64 64"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                        >
                                            <path
                                                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                                stroke="currentColor"
                                                strokeWidth={5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                                stroke="currentColor"
                                                strokeWidth={5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-gray-900"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
                               
                            </div>
                            <div className="flex items-center pt-0">
                                <form
                                    className="flex items-center justify-center w-full space-x-2"
                                    onSubmit={chatGpt}
                                >
                                    <input
                                        onChange={(e) =>
                                            setNewChat(e.target.value)
                                        }
                                        value={newChat}
                                        className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                        placeholder="Type your message"
                                    />
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
