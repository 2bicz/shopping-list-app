package com.example.shopping_list.service.impl;

import com.example.shopping_list.exception.ResourceNotFoundException;
import com.example.shopping_list.model.dto.IdResponse;
import com.example.shopping_list.model.dto.ShoppingListItemInput;
import com.example.shopping_list.model.dto.ShoppingListItemOutput;
import com.example.shopping_list.model.entity.ShoppingListItem;
import com.example.shopping_list.repository.ShoppingListItemRepository;
import com.example.shopping_list.service.ShoppingListItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ShoppingListItemServiceImpl implements ShoppingListItemService {
    private final ShoppingListItemRepository repository;

    @Override
    public List<ShoppingListItemOutput> getShoppingListItems() {
        ArrayList<ShoppingListItemOutput> response = new ArrayList<>();

        List<ShoppingListItem> shoppingListItems = repository.findAll();
        for (ShoppingListItem item : shoppingListItems) {
            ShoppingListItemOutput itemResponse = new ShoppingListItemOutput();
            itemResponse.setId(item.getId());
            itemResponse.setTitle(item.getTitle());
            itemResponse.setAmount(item.getAmount());
            itemResponse.setDescription(item.getDescription());
            itemResponse.setCreatedAt(item.getCreatedAt());
            itemResponse.setModifiedAt(item.getModifiedAt());

            response.add(itemResponse);
        }

        return response;
    }

    @Override
    public ShoppingListItemOutput getShoppingListItemById(Long id) throws ResourceNotFoundException {
        ShoppingListItemOutput response = new ShoppingListItemOutput();

        Optional<ShoppingListItem> optionalShoppingListItem = repository.findById(id);
        if (optionalShoppingListItem.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Shopping list item with id %d is empty", id));
        }
        ShoppingListItem shoppingListItem = optionalShoppingListItem.get();

        response.setId(shoppingListItem.getId());
        response.setTitle(shoppingListItem.getTitle());
        response.setAmount(shoppingListItem.getAmount());
        response.setDescription(shoppingListItem.getDescription());
        response.setCreatedAt(shoppingListItem.getCreatedAt());
        response.setModifiedAt(shoppingListItem.getModifiedAt());

        return response;
    }

    @Override
    public IdResponse createShoppingListItem(ShoppingListItemInput input) {
        ShoppingListItem shoppingListItem = new ShoppingListItem();

        shoppingListItem.setTitle(input.getTitle());
        shoppingListItem.setDescription(input.getDescription());
        shoppingListItem.setAmount(input.getAmount());
        shoppingListItem.setCreatedAt(new Date(System.currentTimeMillis()));

        return new IdResponse(repository.save(shoppingListItem).getId());
    }

    @Override
    public IdResponse updateShoppingListItem(Long id, ShoppingListItemInput input) throws RuntimeException {
        if (Objects.isNull(id)) {
            throw new RuntimeException("Provided shopping list item id is empty");
        }

        ShoppingListItem shoppingListItem = obtainExistingShoppingListItem(id);
        shoppingListItem.setTitle(input.getTitle());
        shoppingListItem.setDescription(input.getDescription());
        shoppingListItem.setAmount(input.getAmount());
        shoppingListItem.setModifiedAt(new Date(System.currentTimeMillis()));

        return new IdResponse(repository.save(shoppingListItem).getId());
    }

    @Override
    public void deleteShoppingListItemById(Long id) {
        ShoppingListItem shoppingListItem = obtainExistingShoppingListItem(id);
        repository.deleteById(shoppingListItem.getId());
    }

    private ShoppingListItem obtainExistingShoppingListItem(Long id) throws ResourceNotFoundException {
        Optional<ShoppingListItem> optionalShoppingListItem = repository.findById(id);
        if (optionalShoppingListItem.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Shopping list item with id %d not found", id));
        }
        return optionalShoppingListItem.get();
    }
}
