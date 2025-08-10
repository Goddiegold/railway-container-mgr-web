import axiosInstance from "@/common/utils/axiosInstance";


class ContainerManagerService {
    private readonly apiPrefix = "/v1/container"

    spinUpContainer = async ({ repo, branch }: { repo?: string, branch?: string }) => {

        const requestBody: Record<string, string> = {
        }

        if (repo) {
            requestBody["repoFullName"] = repo;
            if (branch) requestBody["branchName"] = branch;
        }
        return await axiosInstance.post(`${this.apiPrefix}/spin-up`, requestBody)
    }

    spinDownContainer = async ({ serviceId }: { serviceId: string }) => {
        return await axiosInstance.delete(`${this.apiPrefix}/spin-down/${serviceId}`)
    }

    getContainer = async ({ serviceId }: { serviceId: string }) => {
        return await axiosInstance.get(`${this.apiPrefix}/${serviceId}`)
    }
}


const containerManagerService = new ContainerManagerService()

export default containerManagerService;
