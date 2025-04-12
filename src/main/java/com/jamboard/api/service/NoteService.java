package com.jamboard.api.service;

import com.jamboard.api.Repository.NoteRepository;
import com.jamboard.api.model.Notes;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
@Transactional
public class NoteService {
    private final NoteRepository noteRepo;

    public NoteService(NoteRepository noteRepo) {
        this.noteRepo = noteRepo;
    }

    /**
     * Create a new note
     */
    public Notes createNote(Notes note) {
        if (note.getBoardId() == null) {
            throw new IllegalArgumentException("Board ID cannot be null");
        }
        note.setCreatedAt(LocalDateTime.now());
        return noteRepo.save(note);
    }

    /**
     * Get a note by ID
     */
    public Optional<Notes> getNoteById(Long id) {
        return noteRepo.findById(id);
    }

    /**
     * Get all notes for a specific board
     */
    public List<Notes> getNotesByBoardId(UUID boardId) {
        return noteRepo.findByBoardId(boardId);
    }

    /**
     * Get all notes
     */
    public List<Notes> getAllNotes() {
        return noteRepo.findAll();
    }

    /**
     * Update an existing note
     */
    public Optional<Notes> updateNote(Long id, Notes updatedNote) {
        return noteRepo.findById(id)
            .map(existingNote -> {
                existingNote.setContent(updatedNote.getContent());
                existingNote.setColor(updatedNote.getColor());
                existingNote.setBoardId(updatedNote.getBoardId());
                return noteRepo.save(existingNote);
            });
    }

    /**
     * Delete a note by ID
     */
    public void deleteNote(Long id) {
        noteRepo.deleteById(id);
    }

    /**
     * Delete all notes for a board
     */
    public void deleteAllNotesByBoardId(UUID boardId) {
        List<Notes> notesToDelete = noteRepo.findByBoardId(boardId);
        noteRepo.deleteAll(notesToDelete);
    }
}