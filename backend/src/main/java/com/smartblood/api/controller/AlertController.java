package com.smartblood.api.controller;

import com.smartblood.api.model.Alert;
import com.smartblood.api.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {
    
    @Autowired
    private AlertRepository repository;
    
    @GetMapping
    public List<Alert> getAll() {
        return repository.findAll();
    }
}
