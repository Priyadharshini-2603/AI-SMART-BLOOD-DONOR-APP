package com.smartblood.api.controller;

import com.smartblood.api.model.Donor;
import com.smartblood.api.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {

    @Autowired
    private DonorRepository repository;

    @GetMapping
    public List<Donor> getAll() {
        return repository.findAll();
    }
}
