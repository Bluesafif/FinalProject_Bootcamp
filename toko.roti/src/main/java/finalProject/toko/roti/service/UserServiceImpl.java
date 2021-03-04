package finalProject.toko.roti.service;

import finalProject.toko.roti.model.User;
import finalProject.toko.roti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("UserService")
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public void saveUser(User user) {
        synchronized (this) {
            userRepository.saveUser(user);
        }
    }

    @Override
    public void updateUser(User user) {
        synchronized (this) {
            userRepository.updateUser(user);
        }
    }

    @Override
    public List<User> findAll(String paginationSelect) {
        List<User> userList = userRepository.findAll(paginationSelect);
        return userList;
    }

    @Override
    public User findById(String idUser) {
        return null;
    }

    @Override
    public boolean isUserExist(String idUser) {
        return false;
    }

    @Override
    public void status(User user) {
        synchronized (this) {
            userRepository.updateUser(user);
        }
    }
}
