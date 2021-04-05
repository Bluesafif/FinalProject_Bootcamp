package finalProject.toko.roti.controller;


import finalProject.toko.roti.model.Laporan;
import finalProject.toko.roti.model.User;
import finalProject.toko.roti.service.LaporanService;
import finalProject.toko.roti.service.UserService;
import finalProject.toko.roti.util.CustomErrorType;
import finalProject.toko.roti.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/roti/master")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;
    PasswordEncoder encoder = new MessageDigestPasswordEncoder("MD5");

    @Autowired
    LaporanService laporanService;

    //------------------Authentication User------------------// (check)

    @GetMapping("/auth")
    public ResponseEntity<?> auth (@RequestParam Map<Object, Object> params){
        if (params.isEmpty()){
            return new ResponseEntity<>("Data tidak sesuai", HttpStatus.BAD_REQUEST);
        }else{
            if (params.containsKey("username") && !String.valueOf(params.get("username")).isBlank()) {
                User user = userService.findByUsername(String.valueOf(params.get("username")));
                if (user != null){
                    if (params.containsKey("password") && !String.valueOf(params.get("password")).isBlank()){
                        if (encoder.matches((CharSequence) params.get("password"), user.getPassword())){
                            if (user.isStatusUser() == true) {
                                if (user.getRole().equals("Member")) {
                                    Laporan laporan = laporanService.cariLaporan(user.getIdUser());
                                    if (laporan.getSelisih() >= 14) {
                                        userService.ubahUmum(user.getIdUser());
                                        user = userService.findById(user.getIdUser());
                                        return new ResponseEntity<>(user, HttpStatus.OK);
                                    } else {
                                        return new ResponseEntity<>(user, HttpStatus.OK);
                                    }
                                } else {
                                    return new ResponseEntity<>(user, HttpStatus.OK);
                                }
                            } else {
                                return new ResponseEntity<>(new CustomErrorType("Maaf status anda saat ini sedang Tidak Aktif. Silahkan hubungi Admin!"), HttpStatus.CONFLICT);
                            }
                        }else{
                            return new ResponseEntity<>(new CustomErrorType("Kombinasi user atau password salah"), HttpStatus.NOT_FOUND);
                        }
                    }else{
                        return new ResponseEntity<>(new CustomErrorType("Masukkan paramater password"), HttpStatus.BAD_REQUEST);
                    }
                }else {
                    return new ResponseEntity<>(new CustomErrorType("Kombinasi user atau password salah"), HttpStatus.NOT_FOUND);
                }
            }else{
                new ResponseEntity<>(new CustomErrorType("Masukkan parameter username"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(new CustomErrorType("Masukkan paramater username dan password"), HttpStatus.BAD_REQUEST);
        }
    }

    //------------------Register User------------------// (check)

    @PostMapping("/registrasi")
    public ResponseEntity<?> createData(@RequestBody User user) {
        if (user.getNamaLengkap().isBlank() || user.getAlamat().isBlank() ||
                user.getNomorTelepon().isBlank() || user.getEmail().isBlank() ||
                user.getUsername().isBlank() || user.getPassword().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Data tidak boleh kosong"), HttpStatus.BAD_REQUEST);
        } else {
            Pattern p = Pattern.compile("[a-zA-Z0-9.\\\\-_]{3,}");
            Matcher m = p.matcher(user.getUsername());
            if (m.matches()) {
                if (Pattern.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,8}$", user.getPassword())) {
                    if(Pattern.matches("^(\\+62|62|0)8[1-9][0-9]{6,11}$", user.getNomorTelepon())){
                        if (Pattern.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", user.getEmail())){
                            try {
                                User findUser = userService.findByUsername(user.getUsername());
                                if (findUser == null) {
                                    if (userService.isTeleponExist(user.getNomorTelepon())) {
                                        return new ResponseEntity<>(new CustomErrorType("Nomor telepon '" + user.getNomorTelepon() + "' telah tersedia"), HttpStatus.CONFLICT);
                                    } else if (userService.isEmailExist(user.getEmail())) {
                                        return new ResponseEntity<>(new CustomErrorType("Email " + user.getEmail() + " telah tersedia"), HttpStatus.CONFLICT);
                                    } else {
                                        userService.savePelanggan(user);
                                        return new ResponseEntity<>(new CustomSuccessType("Berhasil melakukan input data"), HttpStatus.CREATED);
                                    }
                                } else {
                                    return new ResponseEntity<>(new CustomErrorType("Pelanggan dengan username = '" + user.getUsername() + "' telah tersedia"), HttpStatus.CONFLICT);
                                }
                            } catch (DataAccessException e) {
                                e.printStackTrace();
                                return new ResponseEntity<>(new CustomErrorType("Gagal melakukan input data"), HttpStatus.BAD_GATEWAY);
                            }
                        } else {
                            return new ResponseEntity<>(new CustomErrorType("Email tidak sesuai dengan format email (test123@mail.com)"), HttpStatus.BAD_REQUEST);
                        }
                    } else {
                        return new ResponseEntity<>(new CustomErrorType("Nomor telepon harus (+62##########) atau (62##########) atau (0##########)"), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Password harus terdiri dari 6 sampai 8 karakter, dengan huruf besar dan kecil serta angka"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Username harus terdiri dari minimal 3 huruf, tidak boleh menggunakan spasi, dan tidak boleh memiliki spesial karakter"), HttpStatus.BAD_REQUEST);
            }
        }
    }

    //------------------Get One Data Only for Profile------------------// (check)

    @GetMapping("/profil")
    public ResponseEntity<?> getUserProfil(@RequestParam String idUser) {
        User user = userService.findById(idUser);
        if (user == null) {
            return new ResponseEntity<>(new CustomErrorType("User dengan id " + idUser  + " tidak ada."), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //------------------Change Password------------------// (check)

    @PutMapping("/changePass")
    public ResponseEntity<?> changePass(@RequestParam String passwordLama, @RequestBody User user) {
        if (user.getPassword().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Password tidak boleh kosong!"), HttpStatus.BAD_REQUEST);
        } else {
            User userCheck = userService.findByUsername(user.getUsername());
            if (encoder.matches(passwordLama, userCheck.getPassword())){
                if (Pattern.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,8}$", user.getPassword())) {
                    try {
                        User findUser = userService.findByUsername(user.getUsername());
                        if (findUser != null) {
                            findUser.setPassword(user.getPassword());
                            findUser.setUsername(user.getUsername());
                            userService.updatePassword(findUser);
                            return new ResponseEntity<>(new CustomSuccessType("Berhasil melakukan perubahan password"), HttpStatus.CREATED);
                        } else {
                            return new ResponseEntity<>(new CustomErrorType("Pelanggan dengan username = '" + user.getUsername() + "' telah tersedia"), HttpStatus.CONFLICT);
                        }
                    } catch (DataAccessException e) {
                        e.printStackTrace();
                        return new ResponseEntity<>(new CustomErrorType("Gagal melakukan perubahan password"), HttpStatus.BAD_GATEWAY);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Password harus terdiri dari 6 sampai 8 karakter, dengan huruf besar dan kecil serta angka"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Password lama salah"), HttpStatus.NOT_FOUND);
            }
        }
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/user")
    public ResponseEntity<List<User>> listAllUser(@RequestParam int page, int limit){
        List<User> userList = userService.findAll(page, limit);
        if (userList.isEmpty()) {
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    //------------------Count All User------------------// (check)

    @GetMapping("/user-count")
    public ResponseEntity<?> countUser(){
        int listUser = userService.countAllUser();
        if (listUser == 0){
            return new ResponseEntity<>(listUser, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listUser,HttpStatus.OK);
    }

    //------------------Update a Data------------------// (check)

    @PutMapping("/user/{idUser}")
    public ResponseEntity<?> updateUser(@PathVariable("idUser") String idUser, @RequestBody User user) {
        logger.info("Mengubah user dengan id {}", idUser);

        User users = userService.findById(idUser);
        if (users == null) {
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data User. User dengan id " + idUser + " tidak tersedia."), HttpStatus.NOT_FOUND);
        } else {
            Pattern p = Pattern.compile("[a-zA-Z0-9.\\\\-_]{3,}");
            Matcher m = p.matcher(user.getUsername());
            if (m.matches()){
                if(Pattern.matches("^(\\+62|62|0)8[1-9][0-9]{6,11}$", user.getNomorTelepon())) {
                    if (Pattern.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", user.getEmail())) {
                        try {
                            if (userService.isUsernameExistEdit(user.getUsername(), idUser)) {
                                return new ResponseEntity<>(new CustomErrorType("Username = '" + user.getUsername() + "' telah tersedia"), HttpStatus.CONFLICT);
                            } else if (userService.isTeleponExistEdit(user.getNomorTelepon(), idUser)) {
                                return new ResponseEntity<>(new CustomErrorType("Nomor telepon '" + user.getNomorTelepon() + "' telah tersedia"), HttpStatus.CONFLICT);
                            } else if (userService.isEmailExistEdit(user.getEmail(), idUser)) {
                                return new ResponseEntity<>(new CustomErrorType("Email " + user.getEmail() + " telah tersedia"), HttpStatus.CONFLICT);
                            } else {
                                users.setNamaLengkap(user.getNamaLengkap());
                                users.setUsername(user.getUsername());
                                users.setNomorTelepon(user.getNomorTelepon());
                                users.setEmail(user.getEmail());
                                users.setAlamat(user.getAlamat());

                                userService.updateUser(users);
                                return new ResponseEntity<>(new CustomSuccessType("Data Berhasil Diubah!"), HttpStatus.OK);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            return new ResponseEntity<>(new CustomErrorType("Gagal melakukan input data"), HttpStatus.BAD_GATEWAY);
                        }
                    } else {
                        return new ResponseEntity<>(new CustomErrorType("Email tidak sesuai dengan format email (test123@mail.com)"), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Nomor telepon harus (+62##########) atau (62##########) atau (0##########)"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Username harus terdiri dari minimal 3 huruf, tidak boleh menggunakan spasi, dan tidak boleh memiliki spesial karakter"), HttpStatus.BAD_REQUEST);
            }
        }
    }

    //------------------Save a Data Admin------------------// (check)

    @PostMapping("/save-admin")
    public ResponseEntity<?> savePelanggan(@RequestBody User user){
        if (user.getIdUser().isBlank() || user.getNamaLengkap().isBlank() ||
                user.getUsername().isBlank() || user.getNomorTelepon().isBlank() ||
                user.getEmail().isBlank() || user.getAlamat().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Data tidak boleh kosong"), HttpStatus.BAD_REQUEST);
        } else {
            Pattern p = Pattern.compile("[a-zA-Z0-9.\\\\-_]{3,}");
            Matcher m = p.matcher(user.getUsername());
            if (m.matches()) {
                if(Pattern.matches("^(\\+62|62|0)8[1-9][0-9]{6,11}$", user.getNomorTelepon())){
                    if (Pattern.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", user.getEmail())){
                        try {
                            User findUser = userService.findByUsername(user.getUsername());
                            if (findUser == null) {
                                if (userService.isTeleponExist(user.getNomorTelepon())) {
                                    return new ResponseEntity<>(new CustomErrorType("Nomor telepon '" + user.getNomorTelepon() + "' telah tersedia"), HttpStatus.CONFLICT);
                                }
                                userService.saveAdmin(user);
                                return new ResponseEntity<>(new CustomSuccessType("Berhasil melakukan input data"), HttpStatus.CREATED);
                            } else {
                                return new ResponseEntity<>(new CustomErrorType("Admin dengan username = '" + user.getUsername() + "' telah tersedia"), HttpStatus.CONFLICT);
                            }
                        } catch (DataAccessException e) {
                            e.printStackTrace();
                            return new ResponseEntity<>(new CustomErrorType("Gagal melakukan input data"), HttpStatus.BAD_GATEWAY);
                        }
                    } else {
                        return new ResponseEntity<>(new CustomErrorType("Email tidak sesuai dengan format email (test123@mail.com)"), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Nomor telepon harus (+62##########) atau (62##########) atau (0##########)"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Username harus terdiri dari minimal 3 huruf, tidak boleh menggunakan spasi, dan tidak boleh memiliki spesial karakter"), HttpStatus.BAD_REQUEST);
            }
        }
    }

    //------------------Switching Status One Data Only------------------// (check)

    @PutMapping("/user/status/{idUser}")
    public ResponseEntity<?> updateStatusUser(@PathVariable("idUser") String idUser) {
        logger.info("Mengubah status user dengan id {}", idUser);

        User users = userService.findById(idUser);

        if (users == null) {
            logger.error("Tidak dapat mengubah data User. User dengan id {} tidak tersedia.", idUser);
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data user. User dengan id "
                    + idUser + " tidak tersedia."),
                    HttpStatus.NOT_FOUND);
        }

        if (users.isStatusUser() == true){
            users.setStatusUser(false);
        }else{
            users.setStatusUser(true);
        }

        userService.status(users);
        return new ResponseEntity<>(new CustomSuccessType("Status Berhasil Diubah!"), HttpStatus.OK);
    }

    //------------------Switching Password to Default------------------// (check)

    @PutMapping("/user/password/{idUser}")
    public ResponseEntity<?> switchPassUser(@PathVariable("idUser") String idUser) {
        logger.info("Mengubah password user dengan id {}", idUser);

        User users = userService.findById(idUser);

        if (users == null) {
            logger.error("Tidak dapat mengubah data User. User dengan id {} tidak tersedia.", idUser);
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data user. User dengan id "
                    + idUser + " tidak tersedia."),
                    HttpStatus.NOT_FOUND);
        }

        users.setPassword(idUser);

        userService.passwordDefault(users);
        return new ResponseEntity<>(new CustomSuccessType("Password Berhasil Diubah Menjadi Default!"), HttpStatus.OK);
    }

    //------------------Change Status to Member------------------//

    @PutMapping("/status-member")
    public ResponseEntity<?> ubahRole(@RequestParam String idUser){
        User users = userService.findById(idUser);

        if (users == null){
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data user. User dengan id "
                    + idUser + " tidak tersedia."), HttpStatus.NOT_FOUND);
        }

        userService.ubahMember(idUser);
        return new ResponseEntity<>(new CustomSuccessType("Selamat Anda Telah Menjadi Member!"), HttpStatus.OK);
    }

    //------------------Searching User------------------//

    @GetMapping("/user/searchadmin")
    public ResponseEntity<?> searchingUser(@RequestParam String search, int page, int limit){
        List<User> userList = userService.findSearch(search, page, limit);
        if (userList.isEmpty()) {
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    //------------------Count Searching User------------------//

    @GetMapping("/user/searchadmincount")
    public ResponseEntity<?> searchingUserCount(@RequestParam String search){
        int listUser = userService.countSearch(search);
        if (listUser == 0){
            return new ResponseEntity<>(listUser, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listUser,HttpStatus.OK);
    }
}
