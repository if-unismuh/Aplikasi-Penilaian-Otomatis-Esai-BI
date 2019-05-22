from ujian_app.models import Soal, db
from .penskoranotomatis import PenskoranOtomatis

class PenilaianOtomatis(object):
    '''
    Melakukan Penilaian Otomatis
    '''
    def __init__(self, idujian):
        self.idujian = idujian
    
    def kalkulasi_nilai_ujian_siswa(self):
        '''
        Melakukan kalkulasi nilai ujian siswa
        '''
        pass
    
    def nilai_otomatis(self):
        '''
        Melakukan Penilaian Otomatis
        '''
        listsoal = db.session.query(Soal.idsoal).filter_by(idujian=self.idujian, flag='1')
        
        for soal in listsoal:
            penskoran_otomatis = PenskoranOtomatis(soal.idsoal)
            penskoran_otomatis.skor_otomatis()
        
        self.kalkulasi_nilai_ujian_siswa()