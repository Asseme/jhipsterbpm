package com.cgg.jhipster.bpm.web.rest;
import java.time.LocalDateTime;

import com.google.common.collect.ImmutableMap;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.SignalEventReceivedBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;

@RestController
@RequestMapping("/api/bpm")
public class BPMResource {

   private final RuntimeService runtimeService;

   public BPMResource(RuntimeService runtimeService) {
       this.runtimeService = runtimeService;
   }

   @PostMapping("/signals")
   @Timed
   public ResponseEntity<Void> sendSignal(@RequestBody String signal) {
       SignalEventReceivedBuilder signalEvent = runtimeService.createSignalEvent(signal);
       signalEvent.setVariables(ImmutableMap.of("date", LocalDateTime.now()));
       signalEvent.send();
       System.out.println("ASSEME " + signal +  LocalDateTime.now());
       return ResponseEntity.noContent().build();
   }
}