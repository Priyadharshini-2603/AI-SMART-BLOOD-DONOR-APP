package com.smartblood.api.controller;

import com.smartblood.api.model.BloodUnit;
import com.smartblood.api.repository.BloodUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {
    
    @Autowired
    private BloodUnitRepository repository;
    
    @GetMapping
    public List<BloodUnit> getAll() {
        return repository.findAll();
    }
}
