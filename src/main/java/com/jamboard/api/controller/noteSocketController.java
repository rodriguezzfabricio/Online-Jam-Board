package com.jamboard.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jamboard.api.Repository.NoteRepository;
import com.jamboard.api.model.Notes;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/notes-socket")
public class noteSocketController {
    private final SimpMessagingTemplate messagingTemplate; 
    private NoteRepository noteRepository;
    
    @Autowired
    public noteSocketController(SimpMessagingTemplate messagingTemplate, NoteRepository noteRepository){
        this.messagingTemplate = messagingTemplate;
        this.noteRepository = noteRepository;
    }

    @MessageMapping("/note")
    public void broadcastNote(@Payload Notes note){
        noteRepository.save(note);
        messagingTemplate.convertAndSend("/topic/notes", note);
    }
    
    @MessageMapping("/note/delete")
    public void handleNoteDelete(@Payload Map<String, Long> payload) {
        Long noteId = payload.get("id");
        if (noteId != null) {
            noteRepository.deleteById(noteId);
            
            // Send deletion event to all clients
            Map<String, Object> response = new HashMap<>();
            response.put("type", "DELETE");
            response.put("id", noteId);
            messagingTemplate.convertAndSend("/topic/notes", response);
        }
    }
}
