package com.jamboard.api.controller;

import com.jamboard.api.model.Board;
import com.jamboard.api.Repository.BoardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardRepository boardRepo;

    public BoardController(BoardRepository boardRepo) {
        this.boardRepo = boardRepo;
    }

    @GetMapping
    public List<Board> getAllBoards() {
        return boardRepo.findAll();
    }

    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardRepo.save(board);
    }

   

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable UUID id){
        return boardRepo.findById(id).orElse(null);

    }
}