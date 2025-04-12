package com.jamboard.api.controller;

import com.jamboard.api.model.Drawing;
import com.jamboard.api.model.Note;
import com.jamboard.api.repository.DrawingRepository;
import com.jamboard.api.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class WebSocketController {

    private final NoteRepository noteRepository;
    private final DrawingRepository drawingRepository;

    @Autowired
    public WebSocketController(NoteRepository noteRepository, DrawingRepository drawingRepository) {
        this.noteRepository = noteRepository;
        this.drawingRepository = drawingRepository;
    }

    @MessageMapping("/board/{boardId}/note")
    @SendTo("/topic/board/{boardId}/notes")
    public Note handleNoteUpdate(@DestinationVariable UUID boardId, Note note) {
        // Ensure the note is associated with the correct board
        // This is a simple implementation - consider adding more validation
        return noteRepository.save(note);
    }

    @MessageMapping("/board/{boardId}/drawing")
    @SendTo("/topic/board/{boardId}/drawings")
    public Drawing handleDrawing(@DestinationVariable UUID boardId, Drawing drawing) {
        // Ensure the drawing is associated with the correct board
        // This is a simple implementation - consider adding more validation
        return drawingRepository.save(drawing);
    }
} 