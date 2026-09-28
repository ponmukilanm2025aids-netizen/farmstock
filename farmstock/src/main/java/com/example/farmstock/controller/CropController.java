package com.example.farmstock.controller;

import com.example.farmstock.entity.Crop;
import com.example.farmstock.service.CropService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @PostMapping
    public Crop addCrop(@RequestBody Crop crop) {
        return cropService.addCrop(crop);
    }

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();
    }
}