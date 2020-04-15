package com.macakosoft.rest.webservices.restfulwebservices.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.macakosoft.rest.webservices.restfulwebservices.bean.HelloWorld;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

  @GetMapping("/hello-world/{name}")
  public HelloWorld helloWorldParameter(@PathVariable String name) {
    return new HelloWorld(String.format("Hello %s", name));
  }
}
