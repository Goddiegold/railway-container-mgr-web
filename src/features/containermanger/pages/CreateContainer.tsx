
import { Container, Flex, Paper, TextInput, Text, Button } from "@mantine/core"
import { useState } from "react";
import { GithubLogoIcon, GitBranchIcon, RocketLaunchIcon } from "@phosphor-icons/react"
import useAPI from "@/common/hooks/useAPI";
import containerManagerService from "../service";
import { getApiErrorMessage, toast } from "@/common/utils/helpers";
import { useNavigate } from "react-router-dom";

const CreateContainer = () => {
    //could be replaced with formik
    const navigate = useNavigate()
    const [newService, setNewService] = useState({
        repo: "",
        branch: ""
    })

    const handleUpdateState = (key: keyof typeof newService, value: string) => setNewService({ ...newService, [key]: value })

    const { execute, loading: spinningUpContainer } = useAPI(() => containerManagerService.spinUpContainer({
        repo: newService.repo,
        branch: newService.branch
    }))


    const handleSpinupContainer = () => {
        execute()
            .then(res => {
                toast({ message: "Service Created Successfully!" }).success()
                const service = res?.data?.serviceCreate;
                if (service) {
                    const seviceId = service?.id;
                    const serviceName = service?.name;
                    setTimeout(() => {
                        navigate(`/services/${seviceId}`, { state: { serviceName } })
                    }, 500)
                }
            }).catch(e => {
                const formattedMessage = getApiErrorMessage(e)
                toast({ message: formattedMessage }).error()
            })
    }

    return (
        <Flex h={"100vh"} w={"100%"} justify={"center"} direction={"column"} className="border">

            <Container
                size={"xl"}
                className='w-[100%]'
            >
                <Flex my={"auto"} direction={"column"} justify={"center"} mx={"auto"} h={"100%"} align={"center"} w={"100%"} gap={"lg"}>
                    <Text c={"dark"} ta={"center"} fw={600} >Welcome to Railway Container Manager</Text>
                    <Paper withBorder radius={"md"} h={"auto"} maw={400} w={"100%"} p={{ base: "sm", md: "lg" }}>
                        <Flex w={"100%"} direction={"column"} gap={"md"}>
                            <TextInput
                                radius={"md"}
                                onChange={e => handleUpdateState("repo", e.target.value)}
                                value={newService?.repo}
                                leftSection={<GithubLogoIcon size={20} />}
                                labelProps={{ size: "xs" }}
                                label={"Public Repo (optional)"}
                                w={"100%"}
                                placeholder="Goddiegold/react-js-eval"
                            />

                            <TextInput
                                radius={"md"}
                                onChange={e => handleUpdateState("branch", e.target.value)}
                                leftSection={<GitBranchIcon size={20} />}
                                value={newService?.branch}
                                labelProps={{ size: "xs" }}
                                label={"Branch"}
                                w={"100%"}
                                disabled={!newService?.repo}
                                defaultValue={newService?.branch ? "main" : ""}
                            />

                            <Flex justify={"flex-end"}>
                                <Button
                                    leftSection={<RocketLaunchIcon size={20} />}
                                    onClick={handleSpinupContainer}
                                    loading={spinningUpContainer}
                                    miw={120}
                                    radius={"xl"}
                                >Spin up</Button>
                            </Flex>
                        </Flex>
                    </Paper>
                </Flex>

            </Container>

        </Flex>
    );
}

export default CreateContainer;