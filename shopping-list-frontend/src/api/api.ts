import axios, { AxiosResponse } from "axios";
import { ShoppingListItem } from "../model/shopping-list-item-model";
import { IdResponse } from "../model/id-response";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getShoppingListItems = (): Promise<AxiosResponse<ShoppingListItem[]>> => {
    return api.get<ShoppingListItem[]>('/item');
}

export const createShoppingListItem = (item: ShoppingListItem): Promise<AxiosResponse<IdResponse>> => {
    return api.post<IdResponse>('/item', item);
}

export const updateShoppingListItem = (id: number, item: ShoppingListItem): Promise<AxiosResponse<IdResponse>> => {
    return api.put<IdResponse>(`/item/${id}`, item);
}

export const deleteShoppingListItemById = (id: number): Promise<void> => {
    return api.delete(`/item/${id}`);
}