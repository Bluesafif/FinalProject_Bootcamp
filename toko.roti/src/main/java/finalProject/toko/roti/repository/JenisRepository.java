package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Jenis;

import java.util.List;

public interface JenisRepository {
    Jenis findByIdJenisRoti(String idJenisRoti);

    List<Jenis> findAllJenisRoti();
}
