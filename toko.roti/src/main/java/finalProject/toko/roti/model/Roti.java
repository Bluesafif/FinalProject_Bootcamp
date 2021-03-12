package finalProject.toko.roti.model;

public class Roti {
    private String idRoti;
    private String namaRoti;
    private String idJenisRoti;
    private int stokRoti;
    private int hargaSatuan;
    private int hargaLusin;
    private String keterangan;
    private String jenisRoti;

    public Roti() {
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan, String jenisRoti) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
        this.jenisRoti = jenisRoti;
    }

    public String getIdRoti() {
        return idRoti;
    }

    public void setIdRoti(String idRoti) {
        this.idRoti = idRoti;
    }

    public String getNamaRoti() {
        return namaRoti;
    }

    public void setNamaRoti(String namaRoti) {
        this.namaRoti = namaRoti;
    }

    public String getIdJenisRoti() {
        return idJenisRoti;
    }

    public void setIdJenisRoti(String idJenisRoti) {
        this.idJenisRoti = idJenisRoti;
    }

    public int getStokRoti() {
        return stokRoti;
    }

    public void setStokRoti(int stokRoti) {
        this.stokRoti = stokRoti;
    }

    public int getHargaSatuan() {
        return hargaSatuan;
    }

    public void setHargaSatuan(int hargaSatuan) {
        this.hargaSatuan = hargaSatuan;
    }

    public int getHargaLusin() {
        return hargaLusin;
    }

    public void setHargaLusin(int hargaLusin) {
        this.hargaLusin = hargaLusin;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public String getJenisRoti() {
        return jenisRoti;
    }

    public void setJenisRoti(String jenisRoti) {
        this.jenisRoti = jenisRoti;
    }

    @Override
    public String toString() {
        return "Roti{" +
                "idRoti='" + idRoti + '\'' +
                ", namaRoti='" + namaRoti + '\'' +
                ", idJenisRoti='" + idJenisRoti + '\'' +
                ", stokRoti=" + stokRoti +
                ", hargaSatuan=" + hargaSatuan +
                ", hargaLusin=" + hargaLusin +
                ", keterangan='" + keterangan + '\'' +
                ", jenisRoti='" + jenisRoti + '\'' +
                '}';
    }
}
