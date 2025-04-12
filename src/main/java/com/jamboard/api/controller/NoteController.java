package com.jamboard.api.controller;

import com.jamboard.api.model.Notes;
import com.jamboard.api.Repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    //tweaked not controller
    private final NoteRepository noteRepo;

    public NoteController(NoteRepository noteRepo) {
        this.noteRepo = noteRepo;
    }

    @GetMapping("/board/{boardId}")
    public List<Note> getNotesByBoard(@PathVariable UUID boardId) {
        return noteRepo.findByBoardId(boardId);
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteRepo.save(note);
    }
}