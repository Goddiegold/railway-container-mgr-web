import axiosInstance from "@/common/utils/axiosInstance";
import Config from "@/common/utils/config";


class ContainerManagerService {
    private readonly apiPrefix = "/v1/container"

    spinUpContainer = async ({ repo, branch }: { repo?: string, branch?: string }) => {

        const requestBody: Record<string, string> = {
            projectId: Config.RAILWWAY_DEFAULT_PROJECT_ID
        }

        if (repo) {
            requestBody["repo"] = repo;
            if (branch) requestBody["branchName"] = branch;
        }
        return await axiosInstance.post(`${this.apiPrefix}/spin-up`, requestBody)
    }
}
    

const containerManagerService = new ContainerManagerService()

export default containerManagerService;
