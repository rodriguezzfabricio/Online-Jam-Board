package com.jamboard.api.controller;

import com.jamboard.api.model.Board;
import com.jamboard.api.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "*") // For development - tighten this in production
public class BoardController {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @GetMapping
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable UUID id) {
        Optional<Board> board = boardRepository.findById(id);
        return board.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardRepository.save(board);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable UUID id, @RequestBody Board boardDetails) {
        return boardRepository.findById(id)
                .map(existingBoard -> {
                    existingBoard.setTitle(boardDetails.getTitle());
                    Board updatedBoard = boardRepository.save(existingBoard);
                    return ResponseEntity.ok(updatedBoard);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable UUID id) {
        return boardRepository.findById(id)
                .map(board -> {
                    boardRepository.delete(board);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
} 