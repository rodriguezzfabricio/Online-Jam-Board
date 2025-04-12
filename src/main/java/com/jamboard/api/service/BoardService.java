package com.jamboard.api.service;

import com.jamboard.api.Repository.BoardRepository;
import com.jamboard.api.model.Board;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class BoardService {
    private final BoardRepository boardRepo;

    public BoardService(BoardRepository boardRepo) {
        this.boardRepo = boardRepo;
    }

    /**
     * Create a new board
     */
    public Board createBoard(Board board) {
        board.setId(UUID.randomUUID());
        board.setCreatedAt(LocalDateTime.now());
        return boardRepo.save(board);
    }

    /**
     * Get a board by ID
     */
    public Optional<Board> getBoardById(UUID id) {
        return boardRepo.findById(id);
    }

    /**
     * Get all boards
     */
    public List<Board> getAllBoards() {
        return boardRepo.findAll();
    }

    /**
     * Update a board
     */
    public Optional<Board> updateBoard(UUID id, Board updatedBoard) {
        return boardRepo.findById(id)
            .map(existingBoard -> {
                existingBoard.setName(updatedBoard.getName());
                return boardRepo.save(existingBoard);
            });
    }

    /**
     * Delete a board
     */
    public void deleteBoard(UUID id) {
        boardRepo.deleteById(id);
    }
}
