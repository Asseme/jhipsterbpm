package com.cgg.jhipster.bpm.service;

import java.io.FileWriter;
import java.io.PrintWriter;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;

@Service
public class Printer {

   private final Logger log = LoggerFactory.getLogger(this.getClass());

   public void printMessage(DelegateExecution execution) throws java.io.IOException {
       log.debug("Hello world " + execution.getVariable("date"));
       System.out.print("Hello world " + execution.getVariable("date"));
       try
        {
        String filename ="monFichier.txt";
        FileWriter fw = new FileWriter(filename,true);
        fw.write("Hello world " + execution.getVariable("date"));
        fw.close();
        }
        catch(IOException ioe)
        {
        System.err.println( ioe.getMessage());
        }
   }
}