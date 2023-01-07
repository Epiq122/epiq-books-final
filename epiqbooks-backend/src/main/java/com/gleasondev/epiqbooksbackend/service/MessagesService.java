package com.gleasondev.epiqbooksbackend.service;import com.gleasondev.epiqbooksbackend.entity.Message;import com.gleasondev.epiqbooksbackend.repository.MessageRepository;import com.gleasondev.epiqbooksbackend.requestmodels.AdminQuestionRequest;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Service;import javax.transaction.Transactional;import java.util.Optional;@Service@Transactionalpublic class MessagesService {    private MessageRepository messageRepository;    @Autowired    public MessagesService(MessageRepository messageRepository) {        this.messageRepository = messageRepository;    }    public void postMessage(Message messageRequest, String userEmail) {        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());        message.setUserEmail(userEmail);        messageRepository.save(message);    }    // this is for updating the current message in our admin response.    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception {        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());        if (message.isEmpty()) {            throw new Exception("Message not found");        }        message.get().setAdminEmail(userEmail);        message.get().setResponse(adminQuestionRequest.getResponse());        message.get().setClosed(true);        messageRepository.save(message.get());    }}