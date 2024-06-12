package com.example.shopping_list.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingListItemOutput {
    private Long id;
    private String title;
    private String description;
    private Integer amount;
    private Date createdAt;
    private Date modifiedAt;
}
