package pl.nifena.chatbotweb;

public record MessageRequest(String message, String previousResponseId) {
}
