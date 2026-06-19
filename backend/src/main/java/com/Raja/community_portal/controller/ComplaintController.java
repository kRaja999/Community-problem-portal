package com.Raja.community_portal.controller;

import com.Raja.community_portal.entity.Complaint;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private List<Complaint> complaints = new ArrayList<>();
    private Long nextId = 1L;

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setId(nextId++);
        complaint.setStatus("PENDING");
        complaints.add(complaint);
        return complaint;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaints;
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {

        for (Complaint complaint : complaints) {
            if (complaint.getId().equals(id)) {
                return complaint;
            }
        }

        return null;
    }
}
