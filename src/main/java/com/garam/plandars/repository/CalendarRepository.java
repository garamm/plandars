package com.garam.plandars.repository;

import com.garam.plandars.dto.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
