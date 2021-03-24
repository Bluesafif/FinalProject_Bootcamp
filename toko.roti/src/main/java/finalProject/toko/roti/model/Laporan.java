package finalProject.toko.roti.model;

import java.util.Date;
import java.util.List;

public class Laporan {
    private String idLaporan;
    private String idKeranjang;
    private String idUser;
    private Date tglBeli;
    private int jumlahTotal;
    private int diskon;
    private int jumlahPembayaran;
    private boolean statusLaporan;
    private String namaLengkap;
    private int jumlahKuantitas;
    List<Roti> rotiList;

    public Laporan() {
    }

    public Laporan(String idLaporan, String idKeranjang, String idUser, Date tglBeli, int jumlahTotal, int diskon, int jumlahPembayaran, boolean statusLaporan, int jumlahKuantitas) {
        this.idLaporan = idLaporan;
        this.idKeranjang = idKeranjang;
        this.idUser = idUser;
        this.tglBeli = tglBeli;
        this.jumlahTotal = jumlahTotal;
        this.diskon = diskon;
        this.jumlahPembayaran = jumlahPembayaran;
        this.statusLaporan = statusLaporan;
        this.jumlahKuantitas = jumlahKuantitas;
    }

    public Laporan(String idLaporan, String idKeranjang, String idUser, Date tglBeli, int jumlahTotal, int diskon, int jumlahPembayaran, boolean statusLaporan, String namaLengkap, int jumlahKuantitas) {
        this.idLaporan = idLaporan;
        this.idKeranjang = idKeranjang;
        this.idUser = idUser;
        this.tglBeli = tglBeli;
        this.jumlahTotal = jumlahTotal;
        this.diskon = diskon;
        this.jumlahPembayaran = jumlahPembayaran;
        this.statusLaporan = statusLaporan;
        this.namaLengkap = namaLengkap;
        this.jumlahKuantitas = jumlahKuantitas;
    }

    public String getIdLaporan() {
        return idLaporan;
    }

    public void setIdLaporan(String idLaporan) {
        this.idLaporan = idLaporan;
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

    public Date getTglBeli() {
        return tglBeli;
    }

    public void setTglBeli(Date tglBeli) {
        this.tglBeli = tglBeli;
    }

    public int getJumlahTotal() {
        return jumlahTotal;
    }

    public void setJumlahTotal(int jumlahTotal) {
        this.jumlahTotal = jumlahTotal;
    }

    public int getDiskon() {
        return diskon;
    }

    public void setDiskon(int diskon) {
        this.diskon = diskon;
    }

    public int getJumlahPembayaran() {
        return jumlahPembayaran;
    }

    public void setJumlahPembayaran(int jumlahPembayaran) {
        this.jumlahPembayaran = jumlahPembayaran;
    }

    public boolean isStatusLaporan() {
        return statusLaporan;
    }

    public void setStatusLaporan(boolean statusLaporan) {
        this.statusLaporan = statusLaporan;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public int getJumlahKuantitas() {
        return jumlahKuantitas;
    }

    public void setJumlahKuantitas(int jumlahKuantitas) {
        this.jumlahKuantitas = jumlahKuantitas;
    }

    public List<Roti> getRotiList() {
        return rotiList;
    }

    public void setRotiList(List<Roti> rotiList) {
        this.rotiList = rotiList;
    }

    @Override
    public String toString() {
        return "Laporan{" +
                "idLaporan='" + idLaporan + '\'' +
                ", idKeranjang='" + idKeranjang + '\'' +
                ", idUser='" + idUser + '\'' +
                ", tglBeli=" + tglBeli +
                ", jumlahTotal=" + jumlahTotal +
                ", diskon=" + diskon +
                ", jumlahPembayaran=" + jumlahPembayaran +
                ", statusLaporan=" + statusLaporan +
                ", namaLengkap='" + namaLengkap + '\'' +
                ", jumlahKuantitas=" + jumlahKuantitas +
                ", rotiList=" + rotiList +
                '}';
    }
}
