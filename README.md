<p align="center">
  <h3 align="center">CRUD app with Angular 7 and Spring Boot 2</h3>
</p>

## Author

* **Rafael Lima**  - [Linkedin](https://www.linkedin.com/in/rafaeldblima/)

## Quick start

1. Clone the project
 ```bash
 git clone https://github.com/rafaeldblima/virtual-store.git
 ```

2. Go inside project folder:
 ```bash
 cd store
 ```

3. Now we have two ways:
   1. Development
      1. Install project dependencies - Frontend
            1. Install:
            
            ```bash
            cd web-store
            npm install
            ```
  
            2. Launch development server
        
            ```bash
            ng server
            ```
  
            3. Open browser

            ```bash
            http://localhost:4200/
            ```
       2. Install project dependencies - Backend
       
           **Warning**
          
          > Must have a postgres server installed with login and password **postgres** and a database called **store** on port **5432**.
          Or You can just go to infra folder and user docker-compose up -d postgres
      
          1. Prepare PostgreSQL
       
          **Warning**
          
          > Must have Java and Maven installed
          2. Launch development server
      
           ```bash
           mvn spring-boot:run 
           ```
      
          3. Open browser
      
           ```bash
           http://localhost:8080/swagger-ui.html
           ```
           All endpoints can be tested here
           
   2. Docker-compose
   
      **Warning**
      
      > Must have docker and docker-compose installed
      1. Go inside infra folder
  
       ```bash
       cd infra
       ```
  
      2. Launch docker
   
      **Warning**
      
      > build can take a while
  
       ```bash
       docker-compose up -d
       ```
  
      3. Open browser
   
      **Warning**
      
      > port 80 must be free to be used
  
       ```bash
       http://localhost:80/
       ```

## What's included

* Angular 7;
* HTML 5;
* CSS;
* TypeScript;
* Routing;
* Bootstrap;
* Java 8;
* SpringBoot 2;
* Swagger;
* jUnit.
