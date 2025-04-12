# Online Jam Board

A real-time collaborative drawing and note-taking web application. This project allows multiple users to simultaneously draw and post sticky notes on a shared board.

## Technologies Used

- **Backend**: Java Spring Boot
- **Database**: Supabase (PostgreSQL)
- **Real-time Communication**: WebSockets (STOMP over WebSocket)

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── jamboard/
│   │           └── api/
│   │               ├── config/        # Configuration classes
│   │               ├── controller/    # REST and WebSocket controllers
│   │               ├── model/         # Entity classes
│   │               ├── repository/    # Database repositories
│   │               ├── service/       # Business logic
│   │               └── JamBoardApplication.java  # Main application class
│   └── resources/
│       └── application.properties     # Application configuration
```

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Supabase account (or PostgreSQL database)

### Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd online-jam-board
   ```

2. **Configure Supabase**
   - Create a new Supabase project
   - Get your database connection details

3. **Configure application.properties**
   - Update the database connection details in `src/main/resources/application.properties`
   - Set the following environment variables or modify the default values:
     - SUPABASE_HOST
     - SUPABASE_PORT
     - SUPABASE_DB
     - SUPABASE_USER
     - SUPABASE_PASSWORD

4. **Build the project**
   ```
   mvn clean install
   ```

5. **Run the application**
   ```
   mvn spring-boot:run
   ```

6. **Access the application**
   - The application will be available at `http://localhost:8080`

## API Endpoints

### Boards

- `GET /api/boards`: Get all boards
- `GET /api/boards/{id}`: Get board by ID
- `POST /api/boards`: Create a new board
- `PUT /api/boards/{id}`: Update board by ID
- `DELETE /api/boards/{id}`: Delete board by ID

### WebSocket Endpoints

- Connect to: `/ws`
- Subscribe to board updates: `/topic/board/{boardId}/notes` and `/topic/board/{boardId}/drawings`
- Send note updates: `/app/board/{boardId}/note`
- Send drawing updates: `/app/board/{boardId}/drawing`

## Next Steps / To-Do

- [ ] Implement frontend with React/Vue.js
- [ ] Add user authentication
- [ ] Implement more drawing tools
- [ ] Add board sharing functionality
- [ ] Improve real-time synchronization
- [ ] Add offline support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 