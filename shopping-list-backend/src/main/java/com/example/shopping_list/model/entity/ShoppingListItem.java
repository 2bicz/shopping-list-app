package com.example.shopping_list.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "shopping_list_items")
public class ShoppingListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    @NonNull
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    @NonNull
    private Integer amount;

    @Column(name = "created_at")
    @NonNull
    private Date createdAt;

    @Column(name = "modifiedAt")
    private Date modifiedAt;
}
