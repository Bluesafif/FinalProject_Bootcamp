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
    public User findByUsername(String username) {
        User pd;
        try{
            pd = userRepository.findByUsername(username);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public User findById(String idUser) {
        User pd;
        try{
            pd = userRepository.findById(idUser);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public void savePelanggan(User user) {
        synchronized (this) {
            userRepository.savePelanggan(user);
        }
    }

    @Override
    public void updatePassword(User user) {
        synchronized (this) {
            userRepository.updatePassword(user);
        }
    }

    @Override
    public void saveAdmin(User user) {
        synchronized (this) {
            userRepository.saveAdmin(user);
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
    public boolean isUserExist(String username) {
        return userRepository.isUserExist(username);
    }

    @Override
    public void status(User user) {
        synchronized (this) {
            userRepository.status(user);
        }
    }
}
