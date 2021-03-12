package finalProject.toko.roti.model;

public class Jenis {
    private String idJenisRoti;
    private String jenisRoti;

    public Jenis() {
    }

    public Jenis(String idJenisRoti, String jenisRoti) {
        this.idJenisRoti = idJenisRoti;
        this.jenisRoti = jenisRoti;
    }

    public String getIdJenisRoti() {
        return idJenisRoti;
    }

    public void setIdJenisRoti(String idJenisRoti) {
        this.idJenisRoti = idJenisRoti;
    }

    public String getJenisRoti() {
        return jenisRoti;
    }

    public void setJenisRoti(String jenisRoti) {
        this.jenisRoti = jenisRoti;
    }

    @Override
    public String toString() {
        return "Jenis{" +
                "idJenisRoti='" + idJenisRoti + '\'' +
                ", jenisRoti='" + jenisRoti + '\'' +
                '}';
    }
}