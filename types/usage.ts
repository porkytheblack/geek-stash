export interface IUsage{
    timestamp: string,
    status: "success" | "failed",
    key_status: "active" | "inactive",
    id: string
}