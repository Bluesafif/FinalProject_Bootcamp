package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Keranjang;

import java.util.List;

public interface KeranjangRepository {
    Keranjang findAll(String idUser);

    void deleteDetailById(String idDetail);
}