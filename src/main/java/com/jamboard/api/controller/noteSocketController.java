package com.jamboard.api.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.jamboard.api.Repository.NoteRepository;
import com.jamboard.api.model.Notes;

@Controller
public class noteSocketController {
    private final SimpMessagingTemplate messagingTemplate; 
    private NoteRepository noteRepository;
    @Autowired
    public noteSocketController(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/note")
    public void broadcastNote(Notes note){
        noteRepository.save(note);
        messagingTemplate.convertAndSend("/topic/notes", note);
    }    

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deleteNote(@PathVariable Long id){
        noteRepository.deleteById(id);  
        return ResponseEntity.noContent().build();
    }
}
