import { getApiErrorMessage, toast } from "@/common/utils/helpers";
import { IService } from "@/types/service.type";
import { Button, Container, Flex, Paper, Text } from "@mantine/core";
import { ArrowLeftIcon, Trash } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import containerManagerService from "../service";

const ContainerDetailPage = () => {
    const { state } = useLocation()
    const { serviceId } = useParams()
    const { getContainer, spinDownContainer } = containerManagerService;
    const navigate = useNavigate()

    const { data, isLoading } = useQuery<IService>({
        queryKey: ["service", serviceId],
        queryFn: async () => {
            try {
                const res = await getContainer({ serviceId: serviceId! })
                return res?.data?.service
            } catch (e) {
                const formattedMessage = getApiErrorMessage(e)
                toast({ message: formattedMessage }).error()
                setTimeout(() => {
                    window.location.href = "/"
                }, 500)
            }
        },
        enabled: !state?.serviceName
    })



    const spinDownMutation = useMutation({
        mutationFn: (serviceId: string) => spinDownContainer({ serviceId }),
        onSuccess: (res) => {
            toast({ message: "Service Deleted Successfully!" }).success()
            setTimeout(() => {
                navigate("/")
            }, 500)
            console.log("Service spun down successfully");
            // maybe refetch services list here
        },
        onError: (e) => {
            console.error("Failed to spin down service", e);
            const formattedMessage = getApiErrorMessage(e)
            toast({ message: formattedMessage }).error()
        },
    });

    const handleSpinDownService = (serviceId: string) => {
        if (!state?.serviceName && !data?.name || data?.deletedAt) return;
        spinDownMutation.mutate(serviceId);
    };

    return (
        <Flex h={"100vh"} w={"100%"} justify={"center"} direction={"column"} className="border">

            <Container
                size={"xl"}
                className='w-[100%]'
            >
                <Flex maw={400} mx={"auto"}>
                    <Button
                        onClick={() => navigate("/")}
                        c={"gray"}
                        variant="transparent" px={0}
                        leftSection={<ArrowLeftIcon size={20} />}>Back</Button>
                </Flex>
                <Flex my={"auto"} direction={"column"} justify={"center"} mx={"auto"} h={"100%"} align={"center"} w={"100%"} gap={"lg"}>

                    <Text c={"dark"} ta={"center"} fw={600} maw={400}>Railway Service: {state?.serviceName || data?.name} {data?.deletedAt ? "(deleted)" : ""}</Text>
                    <Paper withBorder radius={"md"} h={"auto"} maw={400} w={"100%"} p={{ base: "sm", md: "lg" }}>

                        <Flex justify={"flex-end"}>
                            <Button
                                disabled={!state?.serviceName && !data?.name || !!data?.deletedAt}
                                loading={spinDownMutation.isPending}
                                leftSection={<Trash size={20} />}
                                color="red"
                                onClick={() => handleSpinDownService(serviceId!)}
                                w={150}
                                radius={"xl"}
                            >Spin down</Button>
                        </Flex>
                        {/* </Flex> */}
                    </Paper>

                </Flex>

            </Container>

        </Flex>
    );
}

export default ContainerDetailPage;