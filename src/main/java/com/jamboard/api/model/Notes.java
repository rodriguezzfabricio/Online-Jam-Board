package com.jamboard.api.model;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content; 
    private int x; 
    private int y; 
    private String color; 

    @Column(name = "board_id")
    private UUID boardId; 

    @Column(name = "created_at")
    private LocalDateTime createdAt; 




}
