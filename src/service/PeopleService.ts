import apiClient from "@/http-common";

class PeopleService {
    async getAll(next: string|null): Promise<any> {
        next = next?.replace('https://swapi.dev/api/', '') || "people";
        return apiClient.get(next).then((res) => {
            return res.data;
        });
    }
    async getDetail(id: number): Promise<any> {
        return apiClient.get(`people/${id}`).then((res) => {
            return res.data;
        });
    }
    async search(query: string): Promise<any> {
        return apiClient.get(`people/?search=${query}`).then((res) => {
            return res.data;
        });
    }
}

export default new PeopleService;