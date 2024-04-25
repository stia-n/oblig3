package com.example.oblig1.Repositories;

import com.example.oblig1.Models.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public void addTicket(Ticket theTicket){
        String sql = "INSERT INTO tickets(movie, amount, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?);";
        db.update(sql, theTicket.getMovie(), theTicket.getAmount(), theTicket.getFirstName(), theTicket.getLastName(), theTicket.getPhone(), theTicket.getEmail());
    }

    public List<Ticket> getTickets(){
        String sql = "SELECT id, movie, amount, firstName, lastName, phone, email FROM tickets ORDER BY lastName";
        return db.query(sql, new BeanPropertyRowMapper<>(Ticket.class));
    }

    public void deleteTicket(long id){
        String sql = "DELETE FROM tickets WHERE id = ?;";
        db.update(sql, id);
    }

    public void deleteTickets(){
        String sql = "DELETE FROM tickets;";
        db.update(sql);
    }

    public void updateTicket(Ticket theTicket) {
        String sql = "UPDATE tickets SET movie = ?, amount = ?, firstName = ?, lastName = ?, phone = ?, email = ? where id= ?";
        db.update(sql, theTicket.getMovie(), theTicket.getAmount(), theTicket.getFirstName(), theTicket.getLastName(), theTicket.getPhone(), theTicket.getEmail(), theTicket.getId());
    }

}
