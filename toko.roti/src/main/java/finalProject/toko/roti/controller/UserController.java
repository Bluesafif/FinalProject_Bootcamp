package finalProject.toko.roti.controller;


import finalProject.toko.roti.model.User;
import finalProject.toko.roti.service.UserService;
import finalProject.toko.roti.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/roti/master")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    //------------------Get All Data------------------//

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<List<User>> listAllUser(@RequestParam Map<Object, Object> pagination){
        String paginationSelect = "";
        if (pagination.containsKey("limit")){
            paginationSelect += " LIMIT " + pagination.get("limit");
        }
        if(pagination.containsKey("offset")){
            paginationSelect += " OFFSET " + pagination.get("offset");
        }
        List<User> userList = userService.findAll(paginationSelect);
        if (userList.isEmpty()) {
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    //------------------Save a Data------------------//

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody User user){
        logger.info("Menyimpan User : {} ", user);

        if (userService.isUserExist(user.getUsername())) {
            logger.error("Tidak dapat menyimpan user! User dengan username {} sudah tersedia!", user.getUsername());
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat menyimpan user! User dengan username " +
                    user.getUsername() + " sudah tersedia!"), HttpStatus.CONFLICT);
        }

        userService.saveUser(user);

        return new ResponseEntity<>("Data Berhasil Ditambahkan!", HttpStatus.CREATED);
    }

    //------------------Update a Data------------------//

    @RequestMapping(value = "/user/{idUser}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("idUser") String idUser, @RequestBody User user) {
        logger.info("Mengubah user dengan id {}", idUser);

        User users = userService.findById(idUser);

        if (users == null) {
            logger.error("Tidak dapat mengubah data User . User dengan id {} tidak tersedia.", idUser);
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data User. User dengan id "
                    + idUser + " tidak tersedia."),
                    HttpStatus.NOT_FOUND);
        } else if (userService.isUserExist(user.getUsername())) {
            logger.error("Tidak dapat menyimpan user! User dengan username {} sudah tersedia!", user.getUsername());
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat menyimpan user! User dengan username " +
                    user.getUsername() + " sudah tersedia!"), HttpStatus.CONFLICT);
        }

        users.setNamaLengkap(user.getNamaLengkap());
        users.setUsername(user.getUsername());
        users.setNomorTelepon(user.getNomorTelepon());
        users.setEmail(user.getEmail());
        users.setAlamat(user.getAlamat());
        users.setRole(user.getRole());
//        users.setStatusUser(user.isStatusUser());

        userService.updateUser(users);
        return new ResponseEntity<>("Data Berhasil Diubah!", HttpStatus.OK);
    }

//    //------------------Get One Data Only------------------//
//
//    @RequestMapping(value = "/bahanbaku/{idBahan}", method = RequestMethod.GET)
//    public ResponseEntity<?> getProduct(@PathVariable("idBahan") String idBahan) {
//        logger.info("Mencari bahan dengan id {}", idBahan);
//        Bahan bahan = bahanService.findById(idBahan);
//        if (bahan == null) {
//            logger.error("Bahan dengan id {} tidak ada.", idBahan);
//            return new ResponseEntity<>(new CustomErrorType("Bahan dengan id " + idBahan  + " tidak ada."), HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(bahan, HttpStatus.OK);
//    }

    //------------------Switching Status One Data Only------------------//

    @RequestMapping(value = "/user/status/{idUser}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStatusUser(@PathVariable("idUser") String idUser) {
        logger.info("Mengubah status user dengan id {}", idUser);

        User users = userService.findById(idUser);

        if (users == null) {
            logger.error("Tidak dapat mengubah data User. User dengan id {} tidak tersedia.", idUser);
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data user. User Baku dengan id "
                    + idUser + " tidak tersedia."),
                    HttpStatus.NOT_FOUND);
        }

        if (users.isStatusUser() == true){
            users.setStatusUser(false);
        }else{
            users.setStatusUser(true);
        }

        userService.status(users);
        return new ResponseEntity<>("Status Berhasil Diubah!", HttpStatus.OK);
    }
}
