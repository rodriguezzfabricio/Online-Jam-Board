package com.jamboard.api.model;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Board{
    @Id
    private UUID id; 

    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;


}