package com.example.shopping_list.service;

import com.example.shopping_list.model.dto.IdResponse;
import com.example.shopping_list.model.dto.ShoppingListItemInput;
import com.example.shopping_list.model.dto.ShoppingListItemOutput;

import java.util.List;

public interface ShoppingListItemService {
    List<ShoppingListItemOutput> getShoppingListItems();
    ShoppingListItemOutput getShoppingListItemById(Long id);
    IdResponse createShoppingListItem(ShoppingListItemInput input);
    IdResponse updateShoppingListItem(Long id, ShoppingListItemInput input);
    void deleteShoppingListItemById(Long id);
}
