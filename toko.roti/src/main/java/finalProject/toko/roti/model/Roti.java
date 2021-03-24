package finalProject.toko.roti.model;

public class Roti {
    private String idRoti;
    private String namaRoti;
    private String idJenisRoti;
    private int stokRoti;
    private int hargaSatuan;
    private int hargaLusin;
    private String keterangan;
    private boolean statusRoti;
    private int harga;
    private int totalHarga;
    private String jenisRoti;
    private int kuantitas;
    private String idDetail;

    public Roti() {
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan, boolean statusRoti) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
        this.statusRoti = statusRoti;
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan, boolean statusRoti, String jenisRoti) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
        this.statusRoti = statusRoti;
        this.jenisRoti = jenisRoti;
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan, boolean statusRoti, int harga, int totalHarga, int kuantitas) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
        this.statusRoti = statusRoti;
        this.harga = harga;
        this.totalHarga = totalHarga;
        this.kuantitas = kuantitas;
    }

    public Roti(String idRoti, String namaRoti, String idJenisRoti, int stokRoti, int hargaSatuan, int hargaLusin, String keterangan, boolean statusRoti, int totalHarga, String jenisRoti, int kuantitas, String idDetail) {
        this.idRoti = idRoti;
        this.namaRoti = namaRoti;
        this.idJenisRoti = idJenisRoti;
        this.stokRoti = stokRoti;
        this.hargaSatuan = hargaSatuan;
        this.hargaLusin = hargaLusin;
        this.keterangan = keterangan;
        this.statusRoti = statusRoti;
        this.totalHarga = totalHarga;
        this.jenisRoti = jenisRoti;
        this.kuantitas = kuantitas;
        this.idDetail = idDetail;
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

    public boolean isStatusRoti() {
        return statusRoti;
    }

    public void setStatusRoti(boolean statusRoti) {
        this.statusRoti = statusRoti;
    }

    public int getHarga() {
        return harga;
    }

    public void setHarga(int harga) {
        this.harga = harga;
    }

    public int getTotalHarga() {
        return totalHarga;
    }

    public void setTotalHarga(int totalHarga) {
        this.totalHarga = totalHarga;
    }

    public String getJenisRoti() {
        return jenisRoti;
    }

    public void setJenisRoti(String jenisRoti) {
        this.jenisRoti = jenisRoti;
    }

    public int getKuantitas() {
        return kuantitas;
    }

    public void setKuantitas(int kuantitas) {
        this.kuantitas = kuantitas;
    }

    public String getIdDetail() {
        return idDetail;
    }

    public void setIdDetail(String idDetail) {
        this.idDetail = idDetail;
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
                ", statusRoti=" + statusRoti +
                ", jenisRoti='" + jenisRoti + '\'' +
                ", kuantitas=" + kuantitas +
                ", idDetail='" + idDetail + '\'' +
                '}';
    }
}
