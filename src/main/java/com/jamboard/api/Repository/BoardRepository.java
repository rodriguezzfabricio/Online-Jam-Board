package com.jamboard.api.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jamboard.api.model.Board;

public interface BoardRepository extends JpaRepository<Board,UUID>{
    
}