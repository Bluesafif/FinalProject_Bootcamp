package finalProject.toko.roti.model;

import java.util.Date;

public class User {
    private String idUser;
    private String username;
    private String namaLengkap;
    private String password;
    private String alamat;
    private String nomorTelepon;
    private String email;
    private boolean statusUser;
    private String role;
    private Date tanggalRegis;
    private boolean validasiPass;

    public User() {
    }

    public User(String idUser, String username, String namaLengkap, String password, String alamat, String nomorTelepon, String email, boolean statusUser, String role, Date tanggalRegis, boolean validasiPass) {
        this.idUser = idUser;
        this.username = username;
        this.namaLengkap = namaLengkap;
        this.password = password;
        this.alamat = alamat;
        this.nomorTelepon = nomorTelepon;
        this.email = email;
        this.statusUser = statusUser;
        this.role = role;
        this.tanggalRegis = tanggalRegis;
        this.validasiPass = validasiPass;
    }

    public User(String idUser, String username, String namaLengkap, String password, String alamat, String nomorTelepon, String email, boolean statusUser, String role, Date tanggalRegis) {
        this.idUser = idUser;
        this.username = username;
        this.namaLengkap = namaLengkap;
        this.password = password;
        this.alamat = alamat;
        this.nomorTelepon = nomorTelepon;
        this.email = email;
        this.statusUser = statusUser;
        this.role = role;
        this.tanggalRegis = tanggalRegis;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getNomorTelepon() {
        return nomorTelepon;
    }

    public void setNomorTelepon(String nomorTelepon) {
        this.nomorTelepon = nomorTelepon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isStatusUser() {
        return statusUser;
    }

    public void setStatusUser(boolean statusUser) {
        this.statusUser = statusUser;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getTanggalRegis() {
        return tanggalRegis;
    }

    public void setTanggalRegis(Date tanggalRegis) {
        this.tanggalRegis = tanggalRegis;
    }

    public boolean isValidasiPass() {
        return validasiPass;
    }

    public void setValidasiPass(boolean validasiPass) {
        this.validasiPass = validasiPass;
    }

    @Override
    public String toString() {
        return "User{" +
                "idUser='" + idUser + '\'' +
                ", username='" + username + '\'' +
                ", namaLengkap='" + namaLengkap + '\'' +
                ", password='" + password + '\'' +
                ", alamat='" + alamat + '\'' +
                ", nomorTelepon='" + nomorTelepon + '\'' +
                ", email='" + email + '\'' +
                ", statusUser=" + statusUser +
                ", role='" + role + '\'' +
                ", tanggalRegis=" + tanggalRegis +
                ", validasiPass=" + validasiPass +
                '}';
    }
}
