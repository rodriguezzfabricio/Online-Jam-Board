package com.jamboard.api.Config;

import com.jamboard.api.Repository.BoardRepository;
import com.jamboard.api.model.Board;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.UUID;

@Configuration
public class DataInitializer {

    private static final UUID DEFAULT_BOARD_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");

    /**
     * Initialize default data when the application starts
     */
    @Bean
    public CommandLineRunner initData(BoardRepository boardRepository) {
        return args -> {
            // Check if the default board already exists
            if (boardRepository.findById(DEFAULT_BOARD_ID).isEmpty()) {
                // Create default board
                Board defaultBoard = new Board();
                defaultBoard.setId(DEFAULT_BOARD_ID);
                defaultBoard.setName("Default Board");
                defaultBoard.setCreatedAt(LocalDateTime.now());
                boardRepository.save(defaultBoard);
                
                System.out.println("Created default board with ID: " + DEFAULT_BOARD_ID);
            } else {
                System.out.println("Default board already exists with ID: " + DEFAULT_BOARD_ID);
            }
        };
    }
} 