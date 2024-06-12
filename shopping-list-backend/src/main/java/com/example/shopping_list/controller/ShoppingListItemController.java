package com.example.shopping_list.controller;

import com.example.shopping_list.exception.ResourceNotFoundException;
import com.example.shopping_list.model.dto.ShoppingListItemInput;
import com.example.shopping_list.model.dto.ShoppingListItemOutput;
import com.example.shopping_list.service.ShoppingListItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/item")
public class ShoppingListItemController {
    private final String origin = "*";

    @Autowired
    ShoppingListItemService shoppingListItemService;

    @CrossOrigin(origins = origin)
    @GetMapping
    ResponseEntity<List<ShoppingListItemOutput>> getShoppingListItems() {
        return new ResponseEntity<>(shoppingListItemService.getShoppingListItems(), HttpStatus.OK);
    }

    @CrossOrigin(origins = origin)
    @GetMapping("/{id}")
    ResponseEntity<?> getShoppingListItemById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(shoppingListItemService.getShoppingListItemById(id), HttpStatus.OK);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @CrossOrigin(origins = origin)
    @PostMapping
    ResponseEntity<?> createShoppingListItem(@RequestBody ShoppingListItemInput input) {
        try {
            return new ResponseEntity<>(shoppingListItemService.createShoppingListItem(input), HttpStatus.CREATED);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @CrossOrigin(origins = origin)
    @PutMapping("/{id}")
    ResponseEntity<?> updateShoppingListItem(@PathVariable Long id, @RequestBody ShoppingListItemInput input) {
        try {
            return new ResponseEntity<>(shoppingListItemService.updateShoppingListItem(id, input), HttpStatus.OK);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @CrossOrigin(origins = origin)
    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteShoppingListItemById(@PathVariable Long id) {
        try {
            shoppingListItemService.deleteShoppingListItemById(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }
}
