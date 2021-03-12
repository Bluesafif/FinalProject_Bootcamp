package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Jenis;
import finalProject.toko.roti.repository.JenisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("JenisService")
public class JenisServiceImpl implements JenisService{

    @Autowired
    JenisRepository jenisRepository;

    @Override
    public Jenis findByIdJenisRoti(String idJenisRoti) {
        Jenis pd;
        try{
            pd = jenisRepository.findByIdJenisRoti(idJenisRoti);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public List<Jenis> findAllJenis() {
        List<Jenis> jenisList = jenisRepository.findAllJenisRoti();
        return jenisList;
    }
}
