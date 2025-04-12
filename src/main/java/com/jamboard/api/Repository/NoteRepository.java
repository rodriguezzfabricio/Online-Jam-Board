package com.jamboard.api.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jamboard.api.model.Notes;
//each note is associated with a long id
public interface NoteRepository extends JpaRepository<Notes, Long>{

    List<Notes> findByBoardId(UUID boardId); 
    
}