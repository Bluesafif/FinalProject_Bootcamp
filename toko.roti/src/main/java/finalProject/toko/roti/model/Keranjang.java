package finalProject.toko.roti.model;

import java.util.Date;
import java.util.List;

public class Keranjang {
    private String idKeranjang;
    private String idUser;
    private Date tglKeranjang;
    private boolean statusKeranjang;
    List<Roti> rotiList;

    public Keranjang() {
    }

    public Keranjang(String idKeranjang, String idUser, Date tglKeranjang, boolean statusKeranjang) {
        this.idKeranjang = idKeranjang;
        this.idUser = idUser;
        this.tglKeranjang = tglKeranjang;
        this.statusKeranjang = statusKeranjang;
    }

    public String getIdKeranjang() {
        return idKeranjang;
    }

    public void setIdKeranjang(String idKeranjang) {
        this.idKeranjang = idKeranjang;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Date getTglKeranjang() {
        return tglKeranjang;
    }

    public void setTglKeranjang(Date tglKeranjang) {
        this.tglKeranjang = tglKeranjang;
    }

    public boolean isStatusKeranjang() {
        return statusKeranjang;
    }

    public void setStatusKeranjang(boolean statusKeranjang) {
        this.statusKeranjang = statusKeranjang;
    }

    public List<Roti> getRotiList() {
        return rotiList;
    }

    public void setRotiList(List<Roti> rotiList) {
        this.rotiList = rotiList;
    }

    @Override
    public String toString() {
        return "Keranjang{" +
                "idKeranjang='" + idKeranjang + '\'' +
                ", idUser='" + idUser + '\'' +
                ", tglKeranjang=" + tglKeranjang +
                ", statusKeranjang=" + statusKeranjang +
                ", rotiList=" + rotiList +
                '}';
    }
}
