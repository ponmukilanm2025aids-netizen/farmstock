package com.example.farmstock.controller;

import com.example.farmstock.entity.HarvestBatch;
import com.example.farmstock.service.HarvestBatchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/harvest-batches")
public class HarvestBatchController {

    private final HarvestBatchService harvestBatchService;

    public HarvestBatchController(HarvestBatchService harvestBatchService) {
        this.harvestBatchService = harvestBatchService;
    }

    @PostMapping
    public HarvestBatch addHarvestBatch(@RequestBody HarvestBatch harvestBatch) {
        return harvestBatchService.addHarvestBatch(harvestBatch);
    }

    @GetMapping
    public List<HarvestBatch> getAllHarvestBatches() {
        return harvestBatchService.getAllHarvestBatches();
    }
}