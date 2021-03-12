package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Jenis;

import java.util.List;

public interface JenisService {
    Jenis findByIdJenisRoti(String idJenisRoti);

    List<Jenis> findAllJenis();
}
