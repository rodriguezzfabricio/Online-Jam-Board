package com.jamboard.api.controller;

import com.jamboard.api.model.Notes;
import com.jamboard.api.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<Notes> createNote(@RequestBody Notes note) {
        return ResponseEntity.ok(noteService.createNote(note));
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<Notes>> getNotesByBoard(@PathVariable String boardId) {
        UUID boardUUID;
        if (boardId.equals("default-board")) {
            // Use a predefined UUID for the default board
            boardUUID = UUID.fromString("00000000-0000-0000-0000-000000000000");
        } else {
            try {
                boardUUID = UUID.fromString(boardId);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(noteService.getNotesByBoardId(boardUUID));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notes> getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Notes>> getAllNotes() {
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notes> updateNote(@PathVariable Long id, @RequestBody Notes note) {
        return noteService.updateNote(id, note)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<Void> deleteAllNotesByBoard(@PathVariable UUID boardId) {
        noteService.deleteAllNotesByBoardId(boardId);
        return ResponseEntity.ok().build();
    }
}
