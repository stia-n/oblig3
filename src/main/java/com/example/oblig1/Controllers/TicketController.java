package com.example.oblig1.Controllers;

import com.example.oblig1.Models.Ticket;
import com.example.oblig1.Repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TicketController {

    @Autowired
    TicketRepository repository;

    // places ticket from user into server
    @PostMapping("/postTickets")
    public void addTickets(Ticket newTicket) {
        repository.addTicket(newTicket);
    }

    // updates ticket with id
    @PostMapping("/updateTicket")
    public void updateTicket(Ticket updatedTicket){
        repository.updateTicket(updatedTicket);
    }

    // returns tickets to user
    @GetMapping("/getTickets")
    public List<Ticket> returnTickets(){
        return repository.getTickets();
    }

    // delete tickets
    @DeleteMapping("/deleteTickets")
    public void deleteTickets() {
        repository.deleteTickets();
    }

    // deletes all tickets
    @DeleteMapping("/deleteTicket")
    public void deleteticket(@RequestParam long id){
        repository.deleteTicket(id);
    }

}