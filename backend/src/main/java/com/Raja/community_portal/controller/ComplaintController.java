package com.Raja.community_portal.controller;

import com.Raja.community_portal.entity.Complaint;
import com.Raja.community_portal.repository.ComplaintRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        if (complaint.getStatus() == null || complaint.getStatus().isEmpty()) {
            complaint.setStatus("PENDING");
        }
        return complaintRepository.save(complaint);
    }

    @DeleteMapping("/{id}")
    public void deleteComplaint(@PathVariable Long id) {
        complaintRepository.deleteById(id);
    }
}