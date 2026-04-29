package com.englishapp.common;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demo")
@RequiredArgsConstructor
public class DemoPingController {

    private final DemoPingRepository repository;

    @GetMapping("/pings")
    public List<DemoPing> list() {
        return repository.findTop10ByOrderByCreatedAtDesc();
    }

    @PostMapping("/pings")
    @ResponseStatus(HttpStatus.CREATED)
    public DemoPing create(@Valid @RequestBody CreatePingRequest request) {
        DemoPing ping = new DemoPing();
        ping.setMessage(request.message());
        return repository.save(ping);
    }

    public record CreatePingRequest(@NotBlank String message) {}
}
