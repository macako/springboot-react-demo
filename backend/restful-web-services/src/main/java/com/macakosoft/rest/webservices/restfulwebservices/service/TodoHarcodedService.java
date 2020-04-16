package com.macakosoft.rest.webservices.restfulwebservices.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.macakosoft.rest.webservices.restfulwebservices.bean.Todo;

@Service
public class TodoHarcodedService {
  private static List<Todo> todos = new ArrayList<>();
  private static int idCounter = 0;

  static {
    todos.add(new Todo(++idCounter, "macako", "learn react js", new Date(), false));
    todos.add(new Todo(++idCounter, "macako", "learn spring boot", new Date(), false));
    todos.add(new Todo(++idCounter, "macako", "learn mockito", new Date(), false));
  }

  public List<Todo> findAll() {
    return todos;
  }

  public Todo deleteById(long Id) {
    Todo todo = findById(Id);

    if (todo == null) return null;

    if (todos.remove(todo)) {
      return todo;
    }

    return null;
  }

  public Todo findById(long id) {
    return todos.stream().filter(todo -> todo.getId() == id).findFirst().orElse(null);
  }

  public Todo save(Todo todo) {
    if (todo.getId() == -1 || todo.getId() == 0) {
      todo.setId(++idCounter);
    } else {
      deleteById(todo.getId());
    }

    todos.add(todo);

    return todo;
  }
}
